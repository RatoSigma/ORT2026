import { View, Text, StyleSheet, Image } from 'react-native';

export default function CardProduto({ produto }) {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: produto.imagem || '' }} 
        style={styles.imagem} 
      />
      <View style={styles.info}>
        <Text style={styles.nome}>{produto.nome}</Text>
        <Text style={styles.categoria}>{produto.categoria}</Text>
        <Text style={styles.preco}>R$ {produto.preco.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  imagem: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#ccc',
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  categoria: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  preco: {
    fontSize: 16,
    color: '#2e8b57',
    fontWeight: 'bold',
  },
});
