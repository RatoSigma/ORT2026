import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useAppContext } from '../../context/AppContext';
import CapaJogo from '../../components/capa';

function formatarPreco(preco) {
  return `R$ ${preco.toFixed(2).replace('.', ',')}`;
}

export default function DetalhesScreen() {
  const { id } = useLocalSearchParams();
  const {
    carregando,
    erroCarregamento,
    isFavorito,
    obterJogoPorId,
    alternarFavorito,
    theme,
  } = useAppContext();
  const [erro, setErro] = useState('');
  const jogoId = Array.isArray(id) ? id[0] : id;
  const jogo = jogoId ? obterJogoPorId(jogoId) : undefined;

  if (carregando) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  if (!jogo) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <Text style={{ color: theme.textPrimary }}>Jogo não encontrado.</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={{ color: theme.textPrimary }}>Voltar</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const favorito = isFavorito(jogo.id);

  async function alternarWishlist() {
    setErro('');

    try {
      await alternarFavorito(jogo.id);
    } catch (error) {
      console.error('Erro ao atualizar a wishlist.', error);
      setErro('Não foi possível atualizar a wishlist. Tente novamente.');
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView>
      <View style={styles.content}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={{ color: theme.primary }}>Voltar</Text>
          </Pressable>
          {erroCarregamento ? (
            <Text style={{ color: theme.textPrimary }}>{erroCarregamento}</Text>
          ) : null}
          <CapaJogo jogo={jogo} theme={theme} style={styles.capa} />
          <Text style={{ color: theme.primary }}>{jogo.genero}</Text>
          <Text style={[styles.title, { color: theme.textPrimary }]}>{jogo.titulo}</Text>
          <Text style={[styles.price, { color: theme.textPrimary }]}>{formatarPreco(jogo.preco)}</Text>
          <Text style={[styles.description, { color: theme.textPrimary }]}>{jogo.descricao}</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityState={{ selected: favorito }}
            onPress={alternarWishlist}
            style={[styles.button, { backgroundColor: theme.primary }]}
          >
            <Text style={styles.buttonText}>
              {favorito ? '♥ Remover da Wishlist' : '♡ Adicionar à Wishlist'}
            </Text>
          </Pressable>
          {erro ? <Text style={{ color: theme.danger }}>{erro}</Text> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  capa: {
    maxHeight: 440,
    borderRadius: 8,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontWeight: 'bold',
  },
  description: {
    lineHeight: 22,
  },
  button: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#061423',
    fontWeight: 'bold',
  },
});
