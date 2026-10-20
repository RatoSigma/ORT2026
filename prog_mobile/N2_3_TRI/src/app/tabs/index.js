import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import AppHeader from '../../components/header';
import CardJogo from '../../components/card';
import JogoDestaque from '../../components/destaque';
import { useAppContext } from '../../context/AppContext';

export default function HomeScreen() {
  const {
    carregando,
    erroCarregamento,
    jogoDestaque,
    outrosJogos,
    isFavorito,
    perfil,
    theme,
  } = useAppContext();

  if (carregando) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={outrosJogos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardJogo
            item={item}
            theme={theme}
            favorito={isFavorito(item.id)}
            onPress={() => router.push({ pathname: '/detalhes/id', params: { id: item.id } })}
          />
        )}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View
            style={[
              styles.header,
              { backgroundColor: theme.background },
            ]}
          >
            <AppHeader
              theme={theme}
              title="Catálogo"
              subtitle={`Olá, ${perfil.nickname}. Escolha seu próximo jogo.`}
            />

            {erroCarregamento ? (
              <Text style={{ color: theme.danger }}>{erroCarregamento}</Text>
            ) : null}

            <JogoDestaque
              jogo={jogoDestaque}
              theme={theme}
              favorito={isFavorito(jogoDestaque.id)}
              onPress={() =>
                router.push({ pathname: '/detalhes/id', params: { id: jogoDestaque.id } })
              }
            />

            <Text style={[styles.sectionTitle, { color: theme.primary }]}>Mais jogos</Text>
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
  list: {
    padding: 16,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
