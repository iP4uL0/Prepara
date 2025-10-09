import { Stack } from 'expo-router';
import { ThemeProvider } from '../src/context/ThemeContext';
import { AuthProvider } from '../src/context/AuthContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ title: 'Login' }} />
          <Stack.Screen name="quiz" options={{ title: 'Quiz' }} />
          <Stack.Screen name="admin" options={{ title: 'Admin' }} />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}