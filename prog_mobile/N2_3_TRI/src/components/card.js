import { Pressable, StyleSheet, Text, View } from 'react-native';
import CapaJogo from './capa';

function formatarPreco(preco) {
  return `R$ ${preco.toFixed(2).replace('.', ',')}`;
}

export default function CardJogo({ item, theme, onPress, favorito }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}
    >
      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>{item.titulo}</Text>
        <Text style={{ color: theme.textSecondary }}>{item.genero}</Text>
        <Text style={{ color: theme.textPrimary }}>{formatarPreco(item.preco)}</Text>
        {favorito ? <Text style={{ color: theme.primary }}>Na wishlist</Text> : null}
      </View>
      <CapaJogo jogo={item} theme={theme} style={styles.capa} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  capa: {
    width: 180,
    height: 220,
    borderRadius: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
