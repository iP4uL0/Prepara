import React from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import { Stack } from 'expo-router';
import './App.css';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="app" options={{ headerShown: false }} />
        <Stack.Screen name="" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
