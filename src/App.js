import { useRef, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Speech from 'expo-speech';
import { frases } from './frases';
import { estilos } from './estilos';
import { Cabecalho } from './componentes/Cabecalho';
import { FiltrosCategorias } from './componentes/FiltrosCategorias';
import { CartaoFrase } from './componentes/CartaoFrase';
import { UltimaMensagem } from './componentes/UltimaMensagem';
import { ControlesAudio } from './componentes/ControlesAudio';

export default function App() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');
  const [ultimaFrase, setUltimaFrase] = useState(null);

  // A referência invalida pedidos ultrapassados sem redesenhar a tela.
  const pedidoDeVoz = useRef(0);

  const frasesFiltradas = frases.filter(
    (frase) =>
      categoriaSelecionada === 'Todas' ||
      frase.categoria === categoriaSelecionada,
  );

  function avisarFalhaDeVoz() {
    Alert.alert(
      'Não foi possível falar',
      'Configure uma voz em português (Brasil) nas opções de síntese de voz do Android. As mensagens continuam disponíveis na tela.',
    );
  }

  async function falarFrase(texto) {
    const pedidoAtual = ++pedidoDeVoz.current;

    try {
      // Parar antes de falar evita acumular mensagens na fila do Android.
      await Speech.stop();
      if (pedidoAtual !== pedidoDeVoz.current) {
        return;
      }

      setUltimaFrase(texto);

      const vozes = await Speech.getAvailableVoicesAsync();

      if (pedidoAtual !== pedidoDeVoz.current) {
        return;
      }

      const temVozBrasileira = vozes.some(
        (voz) => voz.language.replace('_', '-').toLowerCase() === 'pt-br',
      );

      if (!temVozBrasileira) {
        avisarFalhaDeVoz();
        return;
      }

      Speech.speak(texto, {
        language: 'pt-BR',
        rate: 1.5,
        onError: () => {
          if (pedidoAtual === pedidoDeVoz.current) {
            avisarFalhaDeVoz();
          }
        },
      });
    } catch {
      // O texto continua útil mesmo quando o mecanismo de voz falha.
      if (pedidoAtual === pedidoDeVoz.current) {
        setUltimaFrase(texto);
        avisarFalhaDeVoz();
      }
    }
  }

  async function repetirFrase() {
    if (ultimaFrase) {
      await falarFrase(ultimaFrase);
    }
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
    <SafeAreaProvider>
      <View style={estilos.tela}>
        <Cabecalho />

        <ScrollView
          style={estilos.rolagem}
          contentContainerStyle={estilos.conteudo}
        >
          <View style={estilos.introducao}>
            <Text
              accessibilityRole="header"
              style={estilos.titulo}
            >
              Escolha uma mensagem
            </Text>

            <Text style={estilos.apoio}>
              Toque em um cartão para ouvi-lo.
            </Text>
          </View>

          <FiltrosCategorias
            categoriaSelecionada={categoriaSelecionada}
            aoSelecionar={setCategoriaSelecionada}
          />

          <View style={estilos.grade}>
            {frasesFiltradas.map((frase) => (
              <CartaoFrase
                key={frase.id}
                frase={frase}
                aoFalar={falarFrase}
              />
            ))}
          </View>

          <UltimaMensagem frase={ultimaFrase} />
        </ScrollView>

        <ControlesAudio
          podeRepetir={ultimaFrase !== null}
          aoRepetir={repetirFrase}
          aoCancelar={pararAudio}
        />
      </View>
    </SafeAreaProvider>
  );
}
