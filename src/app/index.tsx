import React, { useState } from 'react'
import '../index.css'
import { Redirect, useRouter } from 'expo-router'
import { useAuth } from '../context/AuthContext'
import { loginService, cadastroService } from '../service/login.service'
import type { LoginData, RegisterData, User } from '../types'

// Guardas de rota usando expo-router
// Componente para proteger rotas que precisam de autenticação
type ProtectedRouteProps = { children: React.ReactNode };
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Carregando...</div>;
  if (!user) return <Redirect href="/login" />;
  return <>{children}</>;
};

// Componente para proteger rotas de admin
type AdminRouteProps = { children: React.ReactNode };
const AdminRoute = ({ children }: AdminRouteProps) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Carregando...</div>;
  if (!user) return <Redirect href="/login" />;
  if (user.tipo !== 'admin') return <Redirect href="/quiz" />;
  return <>{children}</>;
};

// Componente para redirecionar usuários já logados
type PublicRouteProps = { children: React.ReactNode };
const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading">Carregando...</div>;
  if (user) return user.tipo === 'admin' ? <Redirect href="/admin" /> : <Redirect href="/quiz" />;
  return <>{children}</>;
};

// Página Index baseada no código fornecido (adaptada para Web e integrando serviços do projeto)
function NovoCadastro() {
  const [isLogin, setIsLogin] = useState(true);

  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');
  const [showSenhaLogin, setShowSenhaLogin] = useState(false);

  const [nomeCadastro, setNomeCadastro] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [showSenhaCadastro, setShowSenhaCadastro] = useState(false);
  const [showConfirmSenha, setShowConfirmSenha] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8}$/;

  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!emailLogin || !senhaLogin) {
      window.alert('Atenção: Preencha todos os campos!');
      return;
    }
    if (!emailRegex.test(emailLogin)) {
      window.alert('Erro: Digite um e-mail válido contendo @ e domínio.');
      return;
    }
    if (!senhaRegex.test(senhaLogin)) {
      window.alert('Erro: A senha deve ter 8 caracteres, incluindo maiúsculas, minúsculas, números e símbolos.');
      return;
    }

    try {
      const payload: LoginData = { email: emailLogin, senha: senhaLogin };
      const user: User = await loginService.login(payload);
      login(user);
      window.alert('Sucesso: Login realizado!');
      router.replace(user.tipo === 'admin' ? '/admin' : '/quiz');
    } catch (error: any) {
      console.error(error);
      window.alert('Erro: Falha no login. Tente novamente mais tarde.');
    }
  };

  const handleCadastro = async () => {
    if (!nomeCadastro || !emailCadastro || !senhaCadastro || !confirmSenha) {
      window.alert('Atenção: Preencha todos os campos!');
      return;
    }
    if (senhaCadastro !== confirmSenha) {
      window.alert('Erro: As senhas não coincidem.');
      return;
    }
    if (!emailRegex.test(emailCadastro)) {
      window.alert('Erro: Digite um e-mail válido contendo @ e domínio.');
      return;
    }
    if (!senhaRegex.test(senhaCadastro)) {
      window.alert('Erro: A senha deve ter 8 caracteres, incluindo maiúsculas, minúsculas, números e símbolos.');
      return;
    }

    try {
      const payload: RegisterData = {
        nome: nomeCadastro,
        email: emailCadastro,
        senha: senhaCadastro,
        senhaConfirmacao: confirmSenha,
      };
      await cadastroService.register(payload);
      window.alert('Sucesso: Cadastro realizado com sucesso!');
      setIsLogin(true);
    } catch (error: any) {
      console.error(error);
      window.alert('Erro: Erro ao tentar cadastrar. Tente novamente mais tarde.');
    }
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <div style={styles.card as React.CSSProperties}>
        {isLogin ? (
          <>
            <h2 style={styles.title as React.CSSProperties}>Entrar</h2>

            <input
              style={styles.input as React.CSSProperties}
              placeholder="Digite seu email"
              value={emailLogin}
              onChange={(e) => setEmailLogin(e.target.value)}
              type="email"
            />

            <div style={styles.inputWrapper as React.CSSProperties}>
              <input
                style={styles.inputPassword as React.CSSProperties}
                placeholder="Digite sua senha"
                value={senhaLogin}
                onChange={(e) => setSenhaLogin(e.target.value)}
                type={showSenhaLogin ? 'text' : 'password'}
              />
              <button onClick={() => setShowSenhaLogin(!showSenhaLogin)} style={styles.eyeButton as React.CSSProperties}>
                {showSenhaLogin ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>

            <button style={styles.button as React.CSSProperties} onClick={handleLogin}>
              <span style={styles.buttonText as React.CSSProperties}>Entrar</span>
            </button>

            <button
              style={styles.switchButton as React.CSSProperties}
              onClick={() => setIsLogin(false)}
            >
              <span style={styles.link as React.CSSProperties}>Criar uma conta</span>
            </button>
          </>
        ) : (
          <>
            <h2 style={styles.title as React.CSSProperties}>Criar uma conta</h2>

            <input
              style={styles.input as React.CSSProperties}
              placeholder="Digite seu nome"
              value={nomeCadastro}
              onChange={(e) => setNomeCadastro(e.target.value)}
              type="text"
            />

            <input
              style={styles.input as React.CSSProperties}
              placeholder="Digite seu email"
              value={emailCadastro}
              onChange={(e) => setEmailCadastro(e.target.value)}
              type="email"
            />

            <div style={styles.inputWrapper as React.CSSProperties}>
              <input
                style={styles.inputPassword as React.CSSProperties}
                placeholder="Digite sua senha"
                value={senhaCadastro}
                onChange={(e) => setSenhaCadastro(e.target.value)}
                type={showSenhaCadastro ? 'text' : 'password'}
              />
              <button onClick={() => setShowSenhaCadastro(!showSenhaCadastro)} style={styles.eyeButton as React.CSSProperties}>
                {showSenhaCadastro ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>

            <div style={styles.inputWrapper as React.CSSProperties}>
              <input
                style={styles.inputPassword as React.CSSProperties}
                placeholder="Confirme sua senha"
                value={confirmSenha}
                onChange={(e) => setConfirmSenha(e.target.value)}
                type={showConfirmSenha ? 'text' : 'password'}
              />
              <button onClick={() => setShowConfirmSenha(!showConfirmSenha)} style={styles.eyeButton as React.CSSProperties}>
                {showConfirmSenha ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>

            <button style={styles.button as React.CSSProperties} onClick={handleCadastro}>
              <span style={styles.buttonText as React.CSSProperties}>Cadastrar</span>
            </button>

            <button
              style={styles.switchButton as React.CSSProperties}
              onClick={() => setIsLogin(true)}
            >
              <span style={styles.link as React.CSSProperties}>Já tenho conta</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f0f4ff, #e8f0fe)'
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    padding: '24px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    marginBottom: '16px',
    textAlign: 'center' as const
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    fontSize: '16px',
    border: '1px solid #d1d5db',
    borderRadius: '10px',
    outline: 'none',
    marginBottom: '12px'
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px'
  },
  inputPassword: {
    flex: 1,
    padding: '12px 14px',
    fontSize: '16px',
    border: '1px solid #d1d5db',
    borderRadius: '10px',
    outline: 'none'
  },
  eyeButton: {
    border: 'none',
    background: '#f3f4f6',
    color: '#111827',
    padding: '8px 12px',
    borderRadius: '10px',
    cursor: 'pointer'
  },
  button: {
    width: '100%',
    backgroundColor: '#2563eb',
    padding: '12px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    marginTop: '8px'
  },
  buttonText: {
    color: '#fff',
    fontSize: '16px',
    fontWeight: 600
  },
  switchButton: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: '10px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    marginTop: '8px'
  },
  link: {
    color: '#2563eb',
    fontWeight: 600,
    textDecoration: 'underline'
  }
};

// Exportar o componente para ser usado em rotas via expo-router
export default NovoCadastro