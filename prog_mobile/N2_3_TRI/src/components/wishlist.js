import { Pressable, StyleSheet, Text, View } from 'react-native';
import CapaJogo from './capa';

function formatarPreco(preco) {
  return `R$ ${preco.toFixed(2).replace('.', ',')}`;
}

export default function WishlistItem({ item, theme, onOpen, onRemove }) {
  return (
    <View style={[styles.item, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <CapaJogo jogo={item} theme={theme} style={styles.capa} />
      <Text style={[styles.title, { color: theme.textPrimary }]}>{item.titulo}</Text>
      <Text style={{ color: theme.textSecondary }}>{item.genero}</Text>
      <Text style={{ color: theme.textPrimary }}>{formatarPreco(item.preco)}</Text>
      <Pressable onPress={onOpen} style={styles.button}>
        <Text style={{ color: theme.primary }}>Ver detalhes</Text>
      </Pressable>
      <Pressable onPress={onRemove} style={styles.button}>
        <Text style={{ color: theme.danger }}>Remover da wishlist</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 14,
    gap: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  capa: {
    maxHeight: 200,
    borderRadius: 6,
  },
  button: {
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
});
