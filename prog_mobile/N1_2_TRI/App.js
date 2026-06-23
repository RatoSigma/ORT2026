import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const tabs = createBottomTabNavigator();

function Cadastro({ cadastroitem }) {
  const [nomeproduto, mudanomeproduto] = useState('');
  const [quantidade, mudaquantidade] = useState('');
  const [categoria, mudacategoria] = useState('');
  const [fornecedor, mudafornecedor] = useState('');
  const [msgerro, mudamsgerro] = useState('');

  const limpacampos = () => {
    mudanomeproduto('');
    mudaquantidade('');
    mudacategoria('');
    mudafornecedor('');
  };

  const salvacadastro = () => {
    if (
      !nomeproduto.trim() ||
      !quantidade.trim() ||
      !categoria.trim() ||
      !fornecedor.trim()
    ) {
      mudamsgerro('Preencha todos os campos antes de cadastrar.');
      return;
    }

    mudamsgerro('');

    cadastroitem({
      id: Date.now().toString(),
      nomeproduto: nomeproduto.trim(),
      quantidade: quantidade.trim(),
      categoria: categoria.trim(),
      fornecedor: fornecedor.trim(),
    });

    limpacampos();
  };

  return (
    <View style={estilos.tela}>
      <Text style={estilos.titulo}>Cadastro de Itens</Text>
      <Text style={estilos.textoerro}>{msgerro}</Text>

      <TextInput
        style={estilos.container}
        placeholder="Nome do Produto"
        value={nomeproduto}
        onChangeText={mudanomeproduto}
      />
      <TextInput
        style={estilos.container}
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={mudaquantidade}
        keyboardType="numeric"
      />
      <TextInput
        style={estilos.container}
        placeholder="Categoria"
        value={categoria}
        onChangeText={mudacategoria}
      />
      <TextInput
        style={estilos.container}
        placeholder="Fornecedor"
        value={fornecedor}
        onChangeText={mudafornecedor}
      />

      <TouchableOpacity style={estilos.botao} onPress={salvacadastro}>
        <Text style={estilos.textobotao}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

function Estoque({ itens, apagaitem }) {

  const mostraitem = ({ item }) => (
    <View style={estilos.container}>
      <Text>{item.nomeproduto}</Text>
      <Text>Quantidade: {item.quantidade}</Text>
      <Text>Categoria: {item.categoria}</Text>
      <Text>Fornecedor: {item.fornecedor}</Text>

      <TouchableOpacity style={estilos.container} onPress={() => apagaitem(item.id)}>
        <Text>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={estilos.tela}>
      <Text style={estilos.titulo}>Itens em Estoque</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={mostraitem}
        ListEmptyComponent={<Text style={estilos.textovazio}>Nenhum item cadastrado.</Text>}
        contentContainerStyle={itens.length === 0 ? estilos.listavazia : estilos.lista}
      />
    </View>
  );
}

function Resumo({ itens }) {

  const totalitens = itens.length;
  const totalestoque = itens.reduce((soma, item) => {
    const quantidadenumero = Number(item.quantidade);
    return soma + (Number.isNaN(quantidadenumero) ? 0 : quantidadenumero);
  }, 0);

  return (
    <View style={estilos.tela}>
      <Text style={estilos.titulo}>Resumo do Estoque</Text>
      <View style={estilos.container}>
        <Text>Itens cadastrados: {totalitens}</Text>
        <Text>Quantidade total em estoque: {totalestoque}</Text>
      </View>
    </View>
  );
}

export default function App() {
  const [itens, mudaitens] = useState([]);

  useEffect(() => {
    console.log('Lista de itens atualizada:', itens);
  }, [itens]);

  const cadastroitem = (itemnovo) => {
    mudaitens((estadoatual) => [...estadoatual, itemnovo]);
  };

  const apagaitem = (iditem) => {
    mudaitens((estadoatual) => estadoatual.filter((item) => item.id !== iditem));
  };

  return (
    <NavigationContainer>
      <tabs.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <tabs.Screen name="Cadastro">
          {() => <Cadastro cadastroitem={cadastroitem} />}
        </tabs.Screen>
        <tabs.Screen name="Estoque">
          {() => <Estoque itens={itens} apagaitem={apagaitem} />}
        </tabs.Screen>
        <tabs.Screen name="Resumo">
          {() => <Resumo itens={itens} />}
        </tabs.Screen>
      </tabs.Navigator>
    </NavigationContainer>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 20,
    marginBottom: 12,
  },
  container: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  botao: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  textobotao: {
    color: '#000000',
  },
  lista: {
    paddingBottom: 12,
  },
  listavazia: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  textovazio: {
    textAlign: 'center',
  },
  textoerro: {
    minHeight: 20,
    marginBottom: 12,
  },
});
