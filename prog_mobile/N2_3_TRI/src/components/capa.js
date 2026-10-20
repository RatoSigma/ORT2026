import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function CapaJogo({ jogo, theme, style }) {
  const [proporcao, setProporcao] = useState(0.7);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let ativo = true;

    Image.getSize(
      jogo.imagemCapa,
      (width, height) => {
        if (ativo && width > 0 && height > 0) {
          setProporcao(width / height);
        }
      },
      () => {}
    );

    return () => {
      ativo = false;
    };
  }, [jogo.imagemCapa]);

  if (!jogo.imagemCapa || erro) {
    return (
      <View
        accessibilityLabel={`Capa indisponível: ${jogo.titulo}`}
        style={[
          styles.indisponivel,
          style,
          { backgroundColor: theme.surface, borderColor: theme.border },
        ]}
      >
        <Text style={{ color: theme.textSecondary }}>Capa indisponível</Text>
      </View>
    );
  }

  return (
    <Image
      accessibilityLabel={`Capa de ${jogo.titulo}`}
      source={{ uri: jogo.imagemCapa }}
      resizeMode="contain"
      onError={() => setErro(true)}
      style={[styles.imagem, style, { aspectRatio: proporcao }]}
    />
  );
}

const styles = StyleSheet.create({
  imagem: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  indisponivel: {
    width: '100%',
    aspectRatio: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
