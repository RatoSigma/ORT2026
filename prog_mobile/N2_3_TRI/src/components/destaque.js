import { Pressable, StyleSheet, Text, View } from 'react-native';
import CapaJogo from './capa';

function formatarPreco(preco) {
  return `R$ ${preco.toFixed(2).replace('.', ',')}`;
}

export default function JogoDestaque({ jogo, theme, onPress, favorito }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}
    >
      <View style={styles.info}>
        <Text style={{ color: theme.primary }}>Destaque</Text>
        <Text style={[styles.title, { color: theme.textPrimary }]}>{jogo.titulo}</Text>
        <Text style={{ color: theme.textSecondary }}>{jogo.genero}</Text>
        <Text numberOfLines={3} style={{ color: theme.textSecondary }}>{jogo.descricao}</Text>
        <Text style={[styles.price, { color: theme.textPrimary }]}>{formatarPreco(jogo.preco)}</Text>
        {favorito ? <Text style={{ color: theme.textPrimary }}>Na wishlist</Text> : null}
      </View>
      <CapaJogo jogo={jogo} theme={theme} style={styles.capa} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 16,
  },
  info: {
    flex: 1,
    gap: 8,
  },
  capa: {
    width: 190,
    height: 220,
    borderRadius: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontWeight: 'bold',
  },
});
