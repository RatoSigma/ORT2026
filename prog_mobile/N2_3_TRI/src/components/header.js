import { StyleSheet, Text, View } from 'react-native';

export default function AppHeader({ theme }) {
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.surface, borderBottomColor: theme.border },
      ]}
    >
      <Text style={[styles.title, { color: theme.textPrimary }]}>Resenha Store</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 56,
    justifyContent: 'center',
    paddingHorizontal: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
});
