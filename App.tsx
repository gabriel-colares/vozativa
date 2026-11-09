import { useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Speech from 'expo-speech';
import { frases, type Frase } from './src/frases';

type Categoria = 'Todas' | Frase['categoria'];

const categorias: Categoria[] = ['Todas', 'Necessidades', 'Sentimentos', 'Conversas'];
const coresCategorias = {
  Necessidades: '#E8F1FF',
  Sentimentos: '#E7F5ED',
  Conversas: '#FFF3DA',
};

export default function App() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria>('Todas');
  const [ultimaFrase, setUltimaFrase] = useState<string | null>(null);
  // Uma referência não redesenha a tela: só invalida pedidos de voz já ultrapassados.
  const pedidoDeVoz = useRef(0);

  const frasesFiltradas = frases.filter(
    (frase) => categoriaSelecionada === 'Todas' || frase.categoria === categoriaSelecionada,
  );

  function avisarFalhaDeVoz() {
    Alert.alert(
      'Não foi possível falar',
      'Configure uma voz em português (Brasil) nas opções de síntese de voz do Android. As mensagens continuam disponíveis na tela.',
    );
  }

  async function falarFrase(texto: string) {
    const pedidoAtual = ++pedidoDeVoz.current;
    try {
      // Parar antes de falar evita acumular mensagens na fila do Android.
      await Speech.stop();
      if (pedidoAtual !== pedidoDeVoz.current) return;
      setUltimaFrase(texto);

      const vozes = await Speech.getAvailableVoicesAsync();
      if (pedidoAtual !== pedidoDeVoz.current) return;
      const temVozBrasileira = vozes.some(
        (voz) => voz.language.replace('_', '-').toLowerCase() === 'pt-br',
      );
      if (!temVozBrasileira) {
        avisarFalhaDeVoz();
        return;
      }

      Speech.speak(texto, {
        language: 'pt-BR',
        rate: 0.9,
        onError: () => {
          if (pedidoAtual === pedidoDeVoz.current) avisarFalhaDeVoz();
        },
      });
    } catch {
      // A mensagem visual permanece útil mesmo quando o mecanismo TTS falha.
      if (pedidoAtual === pedidoDeVoz.current) {
        setUltimaFrase(texto);
        avisarFalhaDeVoz();
      }
    }
  }

  async function repetirFrase() {
    if (ultimaFrase) await falarFrase(ultimaFrase);
  }

  async function pararAudio() {
    pedidoDeVoz.current += 1;
    try {
      await Speech.stop();
    } catch {
      avisarFalhaDeVoz();
    }
  }

  return (
    <View style={estilos.tela}>
      <StatusBar barStyle="light-content" />
      <View style={estilos.cabecalho}>
        <Text accessibilityRole="header" style={estilos.marca}>VozAtiva</Text>
        <Text style={estilos.slogan}>Sua voz em um toque.</Text>
      </View>

      <ScrollView contentContainerStyle={estilos.conteudo}>
        <View style={estilos.introducao}>
          <Text accessibilityRole="header" style={estilos.titulo}>Escolha uma mensagem</Text>
          <Text style={estilos.apoio}>Toque em um cartão para ouvi-lo.</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={estilos.categorias}>
          {categorias.map((categoria) => (
            <Pressable
              key={categoria}
              accessibilityRole="button"
              accessibilityLabel={categoria}
              accessibilityState={{ selected: categoria === categoriaSelecionada }}
              onPress={() => setCategoriaSelecionada(categoria)}
              style={({ pressed }) => [
                estilos.botaoCategoria,
                categoria === categoriaSelecionada && estilos.categoriaAtiva,
                pressed && estilos.pressionado,
              ]}>
              <Text style={[
                estilos.textoCategoria,
                categoria === categoriaSelecionada && estilos.textoBranco,
              ]}>{categoria}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={estilos.grade}>
          {frasesFiltradas.map((frase) => (
            <Pressable
              key={frase.id}
              accessibilityRole="button"
              accessibilityLabel={`Falar: ${frase.texto}`}
              onPress={() => falarFrase(frase.texto)}
              style={({ pressed }) => [
                estilos.cartao,
                { backgroundColor: coresCategorias[frase.categoria] },
                pressed && estilos.pressionado,
              ]}>
              {/* O rótulo do botão já descreve a ação; o emoji não recebe foco. */}
              <Text accessible={false} importantForAccessibility="no"
                style={estilos.emoji}>{frase.emoji}</Text>
              <Text accessible={false} style={estilos.textoCartao}>{frase.texto}</Text>
            </Pressable>
          ))}
        </View>

        <View style={estilos.ultimaMensagem}>
          <Text accessibilityRole="header" style={estilos.rotulo}>Última mensagem</Text>
          {/* Sem anúncio automático, para não competir com a síntese de voz. */}
          <Text accessibilityLiveRegion="none" style={estilos.fraseSelecionada}>
            {ultimaFrase ?? 'Nenhuma mensagem selecionada'}
          </Text>
          <View style={estilos.controles}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Repetir última mensagem configurado por gabriel, disponivel no talkback"
              accessibilityState={{ disabled: ultimaFrase === null }}
              disabled={ultimaFrase === null}
              onPress={repetirFrase}
              style={({ pressed }) => [
                estilos.botaoAudio,
                estilos.botaoRepetir,
                ultimaFrase === null && estilos.botaoDesabilitado,
                pressed && estilos.pressionado,
              ]}>
              <Text style={[
                estilos.textoBotao,
                estilos.textoBranco,
                ultimaFrase === null && estilos.textoDesabilitado,
              ]}>Repetir</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Parar áudio"
              onPress={pararAudio}
              style={({ pressed }) => [estilos.botaoAudio, pressed && estilos.pressionado]}>
              <Text style={estilos.textoBotao}>Parar áudio</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#F6F8FC' },
  cabecalho: {
    backgroundColor: '#174A91',
    paddingHorizontal: 20,
    // No Android, currentHeight inclui o recorte da câmera quando presente.
    paddingTop: (StatusBar.currentHeight ?? 0) + 24,
    paddingBottom: 24,
    gap: 4,
  },
  marca: { fontSize: 28, fontWeight: '700', color: '#FFFFFF' },
  slogan: { fontSize: 14, color: '#FFFFFF' },
  conteudo: {
    padding: 20,
    // Respiro extra permite rolar os controles acima da navegação do Android.
    paddingBottom: 48,
    gap: 20,
  },
  introducao: { gap: 8 },
  titulo: { fontSize: 19, fontWeight: '700', color: '#17263D' },
  apoio: { fontSize: 14, color: '#43536B' },
  categorias: { gap: 8 },
  botaoCategoria: {
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#D7E1EE',
    backgroundColor: '#FFFFFF',
  },
  categoriaAtiva: { backgroundColor: '#174A91', borderColor: '#174A91' },
  textoCategoria: { fontSize: 14, fontWeight: '600', color: '#17263D' },
  grade: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  cartao: {
    // 48% deixa espaço para o vão de 12 dp nas larguras de referência.
    width: '48%',
    minHeight: 124,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D7E1EE',
    padding: 16,
    gap: 12,
  },
  emoji: { fontSize: 32 },
  textoCartao: { fontSize: 17, fontWeight: '600', color: '#17263D' },
  ultimaMensagem: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D7E1EE',
    borderRadius: 18,
    padding: 16,
    gap: 8,
  },
  rotulo: { fontSize: 13, fontWeight: '600', color: '#43536B' },
  fraseSelecionada: { fontSize: 17, fontWeight: '700', color: '#17263D' },
  controles: { flexDirection: 'row', gap: 12, marginTop: 8 },
  botaoAudio: {
    flex: 1,
    minHeight: 48,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D7E1EE',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  botaoRepetir: { backgroundColor: '#174A91', borderColor: '#174A91' },
  textoBotao: { fontSize: 15, fontWeight: '700', color: '#10366B', textAlign: 'center' },
  textoBranco: { color: '#FFFFFF' },
  botaoDesabilitado: { backgroundColor: '#E2E8F0', borderColor: '#E2E8F0' },
  textoDesabilitado: { color: '#64748B' },
  pressionado: { borderColor: '#10366B' },
});
