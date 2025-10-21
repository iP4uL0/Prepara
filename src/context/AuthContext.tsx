// AuthContext.tsx (Atualizado)

import React, { createContext, useContext, useState, useEffect } from "react";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // A verificação é executada apenas uma vez quando o componente é montado
    try {
      // MUDANÇA 1: Ler o objeto 'user' como uma única string do localStorage
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        // Se existir, converte a string JSON de volta para um objeto
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error(
        "Falha ao analisar os dados do usuário do localStorage",
        error
      );
      // Garante que o storage seja limpo se os dados estiverem corrompidos
      localStorage.removeItem("user");
    }

    // Define o carregamento como falso após a verificação
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    // MUDANÇA 2: Armazena o objeto de usuário inteiro como uma única string JSON
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    // MUDANÇA 3: Remove apenas o item 'user' do localStorage
    localStorage.removeItem("user");
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.funcao === "2";

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
