import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
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
    theme,
  } = useAppContext();

  if (carregando) {
    return (
      <SafeAreaView edges={['left', 'right', 'bottom']} style={[styles.container, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={outrosJogos}
        numColumns={2}
        columnWrapperStyle={styles.row}
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
          <View style={styles.header}>
            {erroCarregamento ? (
              <Text style={[styles.error, { color: theme.danger }]}>{erroCarregamento}</Text>
            ) : null}

            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Em Destaque</Text>
            <JogoDestaque
              jogo={jogoDestaque}
              theme={theme}
              favorito={isFavorito(jogoDestaque.id)}
              onPress={() =>
                router.push({ pathname: '/detalhes/id', params: { id: jogoDestaque.id } })
              }
            />
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>Todos os Jogos</Text>
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
  row: {
    justifyContent: 'center',
    gap: 12,
  },
  header: {
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 8,
  },
  error: {
    marginBottom: 10,
  },
});
