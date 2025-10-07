import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { loginService, cadastroService } from '../../service/login.service';
import type { LoginData, RegisterData } from '../../types';
import './Login.css';

const Login: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
const [loginData, setLoginData] = useState<LoginData>({ email: '', senha: '' });
  const [registerData, setRegisterData] = useState<RegisterData>({
    nome: '',
    email: '',
    senha: '',
    senhaConfirmacao: ''
  });

  const { login } = useAuth();
  const { toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginData.email || !loginData.senha) {
      alert('Preencha todos os campos!');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!emailRegex.test(loginData.email)) {
      alert('Digite um e-mail válido contendo @ e domínio.');
      return;
    }

    if (!senhaRegex.test(loginData.senha)) {
      alert('A senha deve ter 8 caracteres, incluindo maiúsculas, minúsculas, números e símbolos.');
      return;
    }

    try {
      const userData = await loginService.login(loginData);
      login(userData);

      if (userData.tipo === 'admin') {
        navigate('/admin');
      } else {
        navigate('/quiz');
      }
    } catch (error: any) {
      console.error('Erro ao fazer login:', error);
      if (error.response?.status === 401) {
        alert('Email ou senha incorretos.');
      } else if (error.response?.status === 403) {
        alert('Acesso negado.');
      } else {
        alert('Erro ao tentar fazer login. Tente novamente mais tarde.');
      }
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { nome, email, senha, senhaConfirmacao } = registerData;

    if (!nome || !email || !senha || !senhaConfirmacao) {
      alert('Todos os campos são obrigatórios');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const nomeRegex = /^[a-zA-Z\s]{3,15}$/;

    if (!nomeRegex.test(nome)) {
      alert('O nome deve ter entre 3 e 15 caracteres e conter apenas letras.');
      return;
    }

    if (!emailRegex.test(email)) {
      alert('Digite um e-mail válido contendo @ e domínio.');
      return;
    }

    if (!senhaRegex.test(senha)) {
      alert('A senha deve ter 8 caracteres, incluindo maiúsculas, minúsculas, números e símbolos.');
      return;
    }

    if (senha !== senhaConfirmacao) {
      alert('As senhas não coincidem.');
      return;
    }

    try {
      await cadastroService.register({ nome, email, senha, senhaConfirmacao });
      alert('Usuário cadastrado com sucesso! Faça login para continuar.');
      setIsSignUp(false);
      setRegisterData({ nome: '', email: '', senha: '', senhaConfirmacao: '' });
    } catch (error: any) {
      console.error('Erro ao cadastrar:', error);
      if (error.response?.status === 409) {
        alert('Este email já está cadastrado.');
      } else {
        alert('Erro ao cadastrar usuário. Tente novamente mais tarde.');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-logo-container">
        <img src="/imagens/icone.png" alt="Ícone Quiz" className="logo" />
      </div>

      <button className="theme-toggle" onClick={toggleTheme}>
        <img 
          src="https://cdn-icons-png.freepik.com/256/544/544209.png" 
          width="20" 
          height="20" 
          alt="Toggle theme" 
        />
      </button>

      <button
        className="close-modal"
        aria-label="Fechar modal"
        onClick={() => navigate('/')}
      >
        ×
      </button>

      <div className={`container ${isSignUp ? 'right-panel-active' : ''}`} id="main">
        <div className="sign-up">
          <form onSubmit={handleRegisterSubmit}>
            <h1>Criar uma conta</h1>
            
            <input
              type="text"
              placeholder="Digite seu nome de usuário"
              value={registerData.nome}
              onChange={(e) => setRegisterData({ ...registerData, nome: e.target.value })}
              required
            />
            
            <input
              type="email"
              placeholder="Digite seu email"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              required
            />

            <input
              type="password"
              placeholder="Digite sua senha"
              value={registerData.senha}
              onChange={(e) => setRegisterData({ ...registerData, senha: e.target.value })}
              required
            />

            <input
              type="password"
              placeholder="Confirme sua senha"
              value={registerData.senhaConfirmacao}
              onChange={(e) => setRegisterData({ ...registerData, senhaConfirmacao: e.target.value })}
              required
            />

            <button type="submit">Cadastrar</button>
          </form>
        </div>

        <div className="sign-in">
          <form onSubmit={handleLoginSubmit}>
            <h1>Entrar</h1>
            
            <input
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
            
            <input
              type="password"
              placeholder="Senha"
              value={loginData.senha}
              onChange={(e) => setLoginData({ ...loginData, senha: e.target.value })}
              required
            />

            <button type="submit">Entrar</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Bem-vindo de volta!</h1>
              <p>Para se manter conectado conosco, faça login com suas informações pessoais</p>
              <button className="ghost" onClick={() => setIsSignUp(false)}>
                Entrar
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Olá, Amigo!</h1>
              <p>Insira seus dados pessoais e comece sua jornada conosco</p>
              <button className="ghost" onClick={() => setIsSignUp(true)}>
                Cadastrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;