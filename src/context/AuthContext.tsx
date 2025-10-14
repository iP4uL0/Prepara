import React, { createContext, useContext, useState, useEffect, } from 'react';
import type { User } from '../types';

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
    // Verificar se há dados do usuário no localStorage
    const storedUserId = localStorage.getItem('id_user');
    const storedEmail = localStorage.getItem('email');
    const storedNome = localStorage.getItem('nome');
    const storedFuncao = localStorage.getItem('funcao');

    if (storedUserId && storedEmail && storedNome) {
      setUser({
        id_user: parseInt(storedUserId),
        email: storedEmail,
        nome: storedNome,
        funcao: storedFuncao || '1'
      });
    }
    setLoading(false);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('id_user', userData.id_user.toString());
    localStorage.setItem('email', userData.email);
    localStorage.setItem('nome', userData.nome);
    localStorage.setItem('funcao', userData.funcao);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('id_user');
    localStorage.removeItem('email');
    localStorage.removeItem('nome');
    localStorage.removeItem('funcao');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.funcao === '2';

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};