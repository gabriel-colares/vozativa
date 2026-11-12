import { Text, View } from 'react-native';
import { estilos } from '../estilos';

export function UltimaMensagem({ frase }) {
  return (
    <View style={estilos.ultimaMensagem}>
      <Text
        accessibilityRole="header"
        style={estilos.rotulo}
      >
        Última mensagem
      </Text>

      {/* Sem anúncio automático para não competir com a síntese de voz. */}
      <Text
        accessibilityLiveRegion="none"
        style={estilos.fraseSelecionada}
      >
        {frase ?? 'Nenhuma mensagem selecionada'}
      </Text>
    </View>
  );
}
