import { StyleSheet, Text, View } from 'react-native';

export default function AppHeader({ theme, title, subtitle }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.name, { color: theme.primary }]}>Resenha Store</Text>
      <Text style={[styles.title, { color: theme.textPrimary }]}>{title}</Text>
      <Text style={{ color: theme.textSecondary }}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
    marginBottom: 20,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
