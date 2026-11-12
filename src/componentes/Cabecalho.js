import { StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { estilos } from '../estilos';

export function Cabecalho() {
  return (
    <SafeAreaView
      edges={['top', 'left', 'right']}
      style={estilos.cabecalho}
    >
      <StatusBar barStyle="light-content" />

      <View 
        style={{
          flexDirection: "row",
          gap: 16
        }}
      >
        <Text
          accessibilityRole="header"
          style={estilos.marca}
        >
          VozAtiva
        </Text>
      </View>

      <Text style={estilos.slogan}>
        Sua voz em um toque.
      </Text>
    </SafeAreaView>
  );
}
