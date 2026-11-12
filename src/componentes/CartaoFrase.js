import { Pressable, Text } from 'react-native';
import { estilos, fundosCategorias } from '../estilos';

export function CartaoFrase({ frase, aoFalar }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Falar: ${frase.texto}`}
      onPress={() => aoFalar(frase.texto)}
      style={({ pressed }) => [
        estilos.cartao,
        fundosCategorias[frase.categoria],
        pressed && estilos.pressionado,
      ]}
    >
      <Text
        accessible={false}
        importantForAccessibility="no"
        style={estilos.emoji}
      >
        {frase.emoji}
      </Text>

      <Text
        accessible={false}
        style={estilos.textoCartao}
      >
        {frase.texto}
      </Text>
    </Pressable>
  );
}
