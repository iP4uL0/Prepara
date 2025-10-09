import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import './Login.css';
import { loginService, cadastroService } from '../../service/login.service';
import { useAuth } from '../../context/AuthContext';
import type { LoginData, RegisterData, User } from '../../types';

const Login: React.FC = () => {
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
    <div className="login-container">
      <div className="card">
        {isLogin ? (
          <>
            <h2 className="title">Entrar</h2>

            <input
              className="input"
              placeholder="Digite seu email"
              value={emailLogin}
              onChange={(e) => setEmailLogin(e.target.value)}
              type="email"
            />

            <div className="input-wrapper">
              <input
                className="input-password"
                placeholder="Digite sua senha"
                value={senhaLogin}
                onChange={(e) => setSenhaLogin(e.target.value)}
                type={showSenhaLogin ? 'text' : 'password'}
              />
              <button onClick={() => setShowSenhaLogin(!showSenhaLogin)} className="eye-button">
                {showSenhaLogin ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>

            <button className="button" onClick={handleLogin}>
              <span className="button-text">Entrar</span>
            </button>

            <button
              className="switch-button"
              onClick={() => setIsLogin(false)}
            >
              <span className="link">Criar uma conta</span>
            </button>
          </>
        ) : (
          <>
            <h2 className="title">Criar uma conta</h2>

            <input
              className="input"
              placeholder="Digite seu nome"
              value={nomeCadastro}
              onChange={(e) => setNomeCadastro(e.target.value)}
              type="text"
            />

            <input
              className="input"
              placeholder="Digite seu email"
              value={emailCadastro}
              onChange={(e) => setEmailCadastro(e.target.value)}
              type="email"
            />

            <div className="input-wrapper">
              <input
                className="input-password"
                placeholder="Digite sua senha"
                value={senhaCadastro}
                onChange={(e) => setSenhaCadastro(e.target.value)}
                type={showSenhaCadastro ? 'text' : 'password'}
              />
              <button onClick={() => setShowSenhaCadastro(!showSenhaCadastro)} className="eye-button">
                {showSenhaCadastro ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>

            <div className="input-wrapper">
              <input
                className="input-password"
                placeholder="Confirme sua senha"
                value={confirmSenha}
                onChange={(e) => setConfirmSenha(e.target.value)}
                type={showConfirmSenha ? 'text' : 'password'}
              />
              <button onClick={() => setShowConfirmSenha(!showConfirmSenha)} className="eye-button">
                {showConfirmSenha ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>

            <button className="button" onClick={handleCadastro}>
              <span className="button-text">Cadastrar</span>
            </button>

            <button
              className="switch-button"
              onClick={() => setIsLogin(true)}
            >
              <span className="link">Já tenho conta</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;