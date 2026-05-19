import { StyleSheet, Text, View, ScrollView, FlatList, SectionList} from 'react-native';

export default function App() {
  const produtos = [
    {'id' : 1, 'nome' : 'Notebook'},
    {'id' : 2, 'nome' : 'Memoria'},
    {'id' : 3, 'nome' : 'Monitor'},
    {'id' : 4, 'nome' : 'Teclado'},
    {'id' : 5, 'nome' : 'Mouse'},
  ]

  const pratos = [
    {
      title: 'Prato Principal',
      data: ['Strogonoff de Linguiça', 'Big Mac'],
    },
   
    {
      title: 'Acompanhamentos',
      data: ['Feijao', 'Farinha']
    },
   
    {
      title: 'Bebidas',
      data: ['Dolly', 'Suco de Urucum']
    }
  ]

  return (
    <View style={styles.container}>
      <FlatList
        data = {produtos}
        keyExtractor = {item => item.id}
        initialNumToRender={20}
        renderItem = {({item}) => (
          <text>{item.id} - {item.nome}</text>
        )}/>
      <SectionList
        sections={pratos}
        keyExtractor={(item,index) => item + index}
        renderItem={({item}) => (
          <view>
            <text style = {{padding: 5, backgroundColor: 'blue'}}>{item}</text>
          </view>
        )}

        renderSectionHeader={({section}) => (
          <text style = {{backgroundColor:'red'}}>{section.title}</text>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});