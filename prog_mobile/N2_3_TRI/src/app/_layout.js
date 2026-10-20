import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { AppProvider, useAppContext } from '../context/AppContext';

function RootNavigator() {
  const { theme } = useAppContext();

  return (
    <>
      <StatusBar style={theme.statusBar} />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.background } }}>
        <Stack.Screen name="tabs" />
        <Stack.Screen name="detalhes/id" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
}
