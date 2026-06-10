import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="rewizje" options={{ title: 'Lista rewizji' }} />
        <Stack.Screen name="formularz" options={{ title: 'Umawianie kontroli' }} />
        <Stack.Screen name="towar/[id]" options={{ title: 'Karta przesyłki' }} />
        <Stack.Screen name="powiadomienia" options={{ title: 'Centrum Powiadomień' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}