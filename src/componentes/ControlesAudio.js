import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { estilos } from '../estilos';

export function ControlesAudio({ podeRepetir, aoRepetir, aoCancelar }) {
  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={estilos.rodape}
    >
      <View style={estilos.controles}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Repetir última mensagem"
          accessibilityState={{ disabled: !podeRepetir }}
          disabled={!podeRepetir}
          onPress={aoRepetir}
          style={({ pressed }) => [
            estilos.botaoAudio,
            estilos.botaoRepetir,
            !podeRepetir && estilos.botaoDesabilitado,
            pressed && estilos.pressionado,
          ]}
        >
          <Text
            style={[
              estilos.textoBotao,
              estilos.textoBranco,
              !podeRepetir && estilos.textoDesabilitado,
            ]}
          >
            Repetir
          </Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Cancelar áudio"
          onPress={aoCancelar}
          style={({ pressed }) => [
            estilos.botaoAudio,
            pressed && estilos.pressionado,
          ]}
        >
          <Text style={estilos.textoBotao}>
            Cancelar áudio
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
