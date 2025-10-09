import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import './App.css';
import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Stack>
                    <Stack.Screen name="home" options={{ title: 'Admin' }} />
                    <Stack.Screen name="login" options={{ headerShown: false }} />
                    <Stack.Screen name="admin" options={{ title: 'Login' }} />
                    <Stack.Screen name="quiz" options={{ title: 'Quiz' }} />
                </Stack>
            </AuthProvider>
        </ThemeProvider>
    );
}