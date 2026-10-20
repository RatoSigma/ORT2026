import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AppHeader from '../../components/header';
import WishlistItem from '../../components/wishlist';
import { useAppContext } from '../../context/AppContext';

export default function PerfilScreen() {
  const {
    carregando,
    erroCarregamento,
    perfil,
    theme,
    wishlistJogos,
    alternarFavorito,
    salvarConfiguracoes,
  } = useAppContext();

  if (carregando) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <PerfilConteudo
      erroCarregamento={erroCarregamento}
      perfil={perfil}
      theme={theme}
      wishlistJogos={wishlistJogos}
      alternarFavorito={alternarFavorito}
      salvarConfiguracoes={salvarConfiguracoes}
    />
  );
}

function PerfilConteudo({
  erroCarregamento,
  perfil,
  theme,
  wishlistJogos,
  alternarFavorito,
  salvarConfiguracoes,
}) {
  const [nickname, setNickname] = useState(perfil.nickname);
  const [darkMode, setDarkMode] = useState(perfil.darkMode);
  const [mensagem, setMensagem] = useState('');
  const [salvandoTema, setSalvandoTema] = useState(false);

  async function salvarPerfil() {
    try {
      await salvarConfiguracoes(nickname, darkMode);
      setMensagem('Configurações salvas com sucesso.');
    } catch (error) {
      console.error('Erro ao salvar as configurações.', error);
      setMensagem('Não foi possível salvar as configurações. Tente novamente.');
    }
  }

  async function removerFavorito(jogoId) {
    try {
      await alternarFavorito(jogoId);
      setMensagem('');
    } catch (error) {
      console.error('Erro ao remover jogo da wishlist.', error);
      setMensagem('Não foi possível atualizar a wishlist. Tente novamente.');
    }
  }

  async function alterarModoEscuro(valor) {
    const temaAnterior = darkMode;
    setDarkMode(valor);
    setSalvandoTema(true);
    setMensagem('');

    try {
      await salvarConfiguracoes(nickname, valor);
      setMensagem('Tema atualizado.');
    } catch (error) {
      console.error('Erro ao alterar o tema.', error);
      setDarkMode(temaAnterior);
      setMensagem('Não foi possível salvar o tema. Tente novamente.');
    } finally {
      setSalvandoTema(false);
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={wishlistJogos}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <WishlistItem
            item={item}
            theme={theme}
            onOpen={() => router.push({ pathname: '/detalhes/id', params: { id: item.id } })}
            onRemove={() => removerFavorito(item.id)}
          />
        )}
        ListHeaderComponent={
          <View
            style={[
              styles.header,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <AppHeader
              theme={theme}
              title="Meu Perfil"
              subtitle="Salve suas preferências e acompanhe sua wishlist."
            />
            {erroCarregamento ? (
              <Text style={{ color: theme.danger }}>{erroCarregamento}</Text>
            ) : null}
            <Text style={[styles.sectionTitle, { color: theme.primary }]}>Configurações</Text>
            <Text style={{ color: theme.textSecondary }}>Nome de Jogador (Nickname)</Text>
            <TextInput
              style={[
                styles.input,
                { color: theme.textPrimary, backgroundColor: theme.inputBackground, borderColor: theme.border },
              ]}
              value={nickname}
              onChangeText={(texto) => {
                setNickname(texto);
                setMensagem('');
              }}
              placeholder="Digite seu nickname"
              placeholderTextColor={theme.textSecondary}
            />
            <View style={[styles.switchRow, { backgroundColor: theme.inputBackground }]}>
              <View>
                <Text style={{ color: theme.textPrimary }}>Modo Escuro</Text>
                <Text style={{ color: theme.textSecondary }}>Tema do aplicativo</Text>
              </View>
              <Switch
                accessibilityLabel="Modo Escuro"
                value={darkMode}
                onValueChange={alterarModoEscuro}
                disabled={salvandoTema}
                trackColor={{ false: theme.border, true: theme.primary }}
                thumbColor="#ffffff"
              />
            </View>
            <Pressable
              onPress={salvarPerfil}
              style={[styles.button, { backgroundColor: theme.primary }]}
            >
              <Text style={styles.buttonText}>Salvar Configurações</Text>
            </Pressable>
            {mensagem ? (
              <Text style={{ color: mensagem.startsWith('Não') ? theme.danger : theme.primary }}>
                {mensagem}
              </Text>
            ) : null}
            <Text style={[styles.sectionTitle, { color: theme.primary }]}>Minha Wishlist</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Nenhum jogo favoritado.</Text>
            <Text style={{ color: theme.textSecondary }}>
              Abra os detalhes de um jogo para adicioná-lo à sua lista.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  header: {
    gap: 10,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  button: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#061423',
    fontWeight: 'bold',
  },
  emptyState: {
    gap: 6,
    paddingVertical: 8,
  },
});
