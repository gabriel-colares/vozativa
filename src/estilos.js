import { StyleSheet } from 'react-native';

// Cores de categoria também ficam aqui, junto das demais decisões visuais.
export const fundosCategorias = StyleSheet.create({
  Conversas: {
    backgroundColor: '#FFF3DA',
  },
  Necessidades: {
    backgroundColor: '#E8F1FF',
  },
  Sentimentos: {
    backgroundColor: '#E7F5ED',
  },
});

export const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#F6F8FC',
  },
  cabecalho: {
    backgroundColor: '#174A91',
    paddingHorizontal: 20,
    // SafeAreaView acrescenta o espaço das barras e dos recortes do aparelho.
    paddingTop: 24,
    paddingBottom: 24,
    gap: 4,
  },
  marca: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  slogan: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  rolagem: {
    flex: 1,
  },
  conteudo: {
    padding: 20,
    gap: 20,
  },
  introducao: {
    gap: 8,
  },
  titulo: {
    fontSize: 19,
    fontWeight: '700',
    color: '#17263D',
  },
  apoio: {
    fontSize: 14,
    color: '#43536B',
  },
  categorias: {
    gap: 8,
  },
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
  categoriaAtiva: {
    backgroundColor: '#174A91',
    borderColor: '#174A91',
  },
  textoCategoria: {
    fontSize: 14,
    fontWeight: '600',
    color: '#17263D',
  },
  grade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
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
  emoji: {
    fontSize: 32,
  },
  textoCartao: {
    fontSize: 17,
    fontWeight: '600',
    color: '#17263D',
  },
  ultimaMensagem: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D7E1EE',
    borderRadius: 18,
    padding: 16,
    gap: 8,
  },
  rotulo: {
    fontSize: 13,
    fontWeight: '600',
    color: '#43536B',
  },
  fraseSelecionada: {
    fontSize: 17,
    fontWeight: '700',
    color: '#17263D',
  },
  rodape: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#D7E1EE',
    backgroundColor: '#FFFFFF',
  },
  controles: {
    flexDirection: 'row',
    gap: 12,
  },
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
  botaoRepetir: {
    backgroundColor: '#174A91',
    borderColor: '#174A91',
  },
  textoBotao: {
    fontSize: 15,
    fontWeight: '700',
    color: '#10366B',
    textAlign: 'center',
  },
  textoBranco: {
    color: '#FFFFFF',
  },
  botaoDesabilitado: {
    backgroundColor: '#E2E8F0',
    borderColor: '#E2E8F0',
  },
  textoDesabilitado: {
    color: '#64748B',
  },
  pressionado: {
    borderColor: '#10366B',
  },
});
