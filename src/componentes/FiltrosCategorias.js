import { Pressable, ScrollView, Text } from 'react-native';
import { categorias } from '../frases';
import { estilos } from '../estilos';

export function FiltrosCategorias({ categoriaSelecionada, aoSelecionar }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={estilos.categorias}
    >
      {categorias.map((categoria) => (
        <Pressable
          key={categoria}
          accessibilityRole="button"
          accessibilityLabel={categoria}
          accessibilityState={{ selected: categoria === categoriaSelecionada }}
          onPress={() => aoSelecionar(categoria)}
          style={({ pressed }) => [
            estilos.botaoCategoria,
            categoria === categoriaSelecionada && estilos.categoriaAtiva,
            pressed && estilos.pressionado,
          ]}
        >
          <Text
            style={[
              estilos.textoCategoria,
              categoria === categoriaSelecionada && estilos.textoBranco,
            ]}
          >
            {categoria}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}
