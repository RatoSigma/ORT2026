import { Pressable, StyleSheet, Text, View } from 'react-native';
import CapaJogo from './capa';

function formatarPreco(preco) {
  return `R$ ${preco.toFixed(2).replace('.', ',')}`;
}

export default function JogoDestaque({ jogo, theme, onPress, favorito }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}
    >
      <View style={styles.coverContainer}>
        <CapaJogo jogo={jogo} theme={theme} style={styles.capa} resizeMode="cover" />
        <Text style={[styles.launchBadge, { backgroundColor: theme.primary }]}>DESTAQUE</Text>
      </View>
      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>{jogo.titulo}</Text>
        <Text numberOfLines={2} style={[styles.description, { color: theme.textSecondary }]}>
          {jogo.descricao}
        </Text>
        <View style={styles.footer}>
          <Text
            style={[
              styles.genre,
              { color: theme.textPrimary, backgroundColor: theme.inputBackground },
            ]}
          >
            {jogo.genero}
          </Text>
          <View style={styles.priceAndFavorite}>
            {favorito ? <Text style={{ color: theme.primary }}>♥</Text> : null}
            <Text style={[styles.price, { color: theme.primary }]}>{formatarPreco(jogo.preco)}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 18,
    borderWidth: 1,
    borderRadius: 14,
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
  launchBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 5,
    color: '#07131f',
    fontSize: 9,
    fontWeight: '800',
  },
  info: {
    padding: 12,
    gap: 7,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    fontSize: 12,
    lineHeight: 17,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  genre: {
    overflow: 'hidden',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 5,
    fontSize: 10,
  },
  priceAndFavorite: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  price: {
    fontWeight: '700',
  },
});
