import { Pressable, StyleSheet, Text, View } from 'react-native';
import CapaJogo from './capa';

function formatarPreco(preco) {
  return `R$ ${preco.toFixed(2).replace('.', ',')}`;
}

export default function CardJogo({ item, theme, onPress, favorito }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}
    >
      <View style={styles.coverContainer}>
        <CapaJogo jogo={item} theme={theme} style={styles.capa} resizeMode="cover" />
        {favorito ? (
          <View style={[styles.favoriteBadge, { backgroundColor: theme.surface }]}>
            <Text style={{ color: theme.primary }}>♥</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.info}>
        <Text numberOfLines={2} style={[styles.title, { color: theme.textPrimary }]}>
          {item.titulo}
        </Text>
        <Text numberOfLines={1} style={[styles.genre, { color: theme.textSecondary }]}>
          {item.genero}
        </Text>
        <Text style={[styles.price, { color: theme.primary }]}>{formatarPreco(item.preco)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    maxWidth: 280,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  coverContainer: {
    position: 'relative',
  },
  capa: {
    width: '100%',
    height: 150,
    backgroundColor: '#29384d',
  },
  favoriteBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    paddingHorizontal: 10,
    paddingVertical: 9,
    gap: 3,
  },
  title: {
    minHeight: 34,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
  },
  genre: {
    fontSize: 10,
  },
  price: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: '700',
  },
});
