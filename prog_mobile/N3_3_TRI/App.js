import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, TextInput, TouchableOpacity,
  FlatList, Alert, SafeAreaView
} from 'react-native';

// TODO: Importar o VeiculoDAO aqui
import * as DAO from './database/VeiculoDAO.js';

export default function App() {
  const [id, setId] = useState(null);
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [diaria, setDiaria] = useState('');
  const [lista, setLista] = useState([]);

  useEffect(function () {
    iniciarBanco();
  }, []);

  async function iniciarBanco() {
    // TODO: Inicializar o banco/tabela via DAO e carregar a lista
    await DAO.iniciarTabela();
    await carregarDados();
  }

  async function carregarDados() {
    // TODO: Buscar todos os veículos no DAO e atualizar o estado 'lista'
    const resultado = await DAO.listar();
    setLista(resultado);
  }

  async function salvar() {
    if (!modelo.trim() || !ano.trim() || !diaria.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    const dados = {
      id: id,
      modelo: modelo,
      ano: parseInt(ano),
      diaria: parseFloat(diaria.replace(',', '.'))
    };

    // TODO: Chamar os método de INSERIR e ATUALIZAR do DAO
    if (id == null) {
      await DAO.inserir(dados);
    } else {
      await DAO.atualizar(dados);
    }

    limparFormulario();
    await carregarDados();

  }

  function confirmarExclusao(idItem) {
    Alert.alert('Excluir', 'Deseja remover este veículo?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sim',
        onPress: async function () {        
          // TODO: Chamar o método de EXCLUIR do DAO passando idItem
          await DAO.excluir(idItem);
          await carregarDados();

          if (id == idItem) {
            limparFormulario();
          }
        }
      }
    ]);
  }

  function selecionarParaEdicao(item) {
    setId(item.id);
    setModelo(item.modelo);
    setAno(String(item.ano));
    setDiaria(String(item.diaria));
  }

  function limparFormulario() {
    setId(null);
    setModelo('');
    setAno('');
    setDiaria('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Locadora - Gestão de Frota</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Modelo do Veículo (ex: Saveiro G4)"
          value={modelo}
          onChangeText={setModelo}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { width: '48%'}]}
            placeholder="Ano (ex: 2013)"
            keyboardType="numeric"
            value={ano}
            onChangeText={setAno}
          />
          <TextInput
            style={[styles.input, { width: '48%' }]}
            placeholder="Diária (ex: 145.50)"
            keyboardType="decimal-pad"
            value={diaria}
            onChangeText={setDiaria}
          />
        </View>

        <TouchableOpacity style={styles.btnSalvar} onPress={salvar}>
          <Text style={styles.btnTexto}>
            {id === null ? 'Cadastrar Veículo' : 'Atualizar Veículo'}
          </Text>
        </TouchableOpacity>

        {id !== null && (
          <TouchableOpacity style={styles.btnCancelar} onPress={limparFormulario}>
            <Text style={styles.btnTexto}>Cancelar Edição</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={lista}
        keyExtractor={function (item) { return String(item.id); }}
        renderItem={function ({ item }) {
          return (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitulo}>{item.modelo}</Text>
                <Text style={styles.cardSub}>
                  Ano: {item.ano} | Diária: R$ {Number(item.diaria).toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.btnEditar}
                onPress={function () { selecionarParaEdicao(item); }}
              >
                <Text style={styles.btnAcaoTexto}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnExcluir}
                onPress={function () { confirmarExclusao(item.id); }}
              >
                <Text style={styles.btnAcaoTexto}>X</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eef2f6', padding: 16, paddingTop: 40 },
  titulo: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, color: '#1e293b' },
  form: { backgroundColor: '#fff', padding: 14, borderRadius: 8, marginBottom: 16, elevation: 2 },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 6, padding: 10, marginBottom: 10, fontSize: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-around'},
  btnSalvar: { backgroundColor: '#059669', padding: 12, borderRadius: 6, alignItems: 'center' },
  btnCancelar: { backgroundColor: '#64748b', padding: 10, borderRadius: 6, alignItems: 'center', marginTop: 8 },
  btnTexto: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 8, elevation: 1 },
  cardTitulo: { fontSize: 16, fontWeight: 'bold', color: '#0f172a' },
  cardSub: { fontSize: 14, color: '#475569', marginTop: 2 },
  btnEditar: { backgroundColor: '#d97706', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 5, marginRight: 6 },
  btnExcluir: { backgroundColor: '#dc2626', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 5 },
  btnAcaoTexto: { color: '#fff', fontWeight: 'bold' }
});