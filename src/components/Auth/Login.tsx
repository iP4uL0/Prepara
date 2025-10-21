import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { loginService, cadastroService } from '../../service/login.service';
import { useAuth } from '../../context/AuthContext';
import type { LoginData, RegisterData, User } from '../../types';

const Login: React.FC = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const [emailLogin, setEmailLogin] = useState('');
  const [senhaLogin, setSenhaLogin] = useState('');
  const [showSenhaLogin, setShowSenhaLogin] = useState(false);

  const [nomeCadastro, setNomeCadastro] = useState('');
  const [emailCadastro, setEmailCadastro] = useState('');
  const [senhaCadastro, setSenhaCadastro] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [showSenhaCadastro, setShowSenhaCadastro] = useState(false);
  const [showConfirmSenha, setShowConfirmSenha] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8}$/;

  const handleLogin = async () => {
    if (!emailLogin || !senhaLogin) return window.alert('Preencha todos os campos!');
    if (!emailRegex.test(emailLogin)) return window.alert('E-mail inválido.');
    if (!senhaRegex.test(senhaLogin))
      return window.alert('A senha deve conter maiúsculas, minúsculas, número e símbolo.');

    try {
      const payload: LoginData = { email: emailLogin, senha: senhaLogin };
      const user: User = await loginService.login(payload);
      login(user);
      window.alert('Sucesso: Login realizado!');
      navigate(user.funcao == '2' ? '/admin' : '/quiz', { replace: true });
    } catch (error: any) {
      console.error(error);
      window.alert('Erro: Falha no login. Tente novamente mais tarde.');
    }
  };

  const handleCadastro = async () => {
    if (!nomeCadastro || !emailCadastro || !senhaCadastro || !confirmSenha)
      return window.alert('Preencha todos os campos!');
    if (senhaCadastro !== confirmSenha) return window.alert('As senhas não coincidem.');
    if (!emailRegex.test(emailCadastro)) return window.alert('E-mail inválido.');
    if (!senhaRegex.test(senhaCadastro))
      return window.alert('A senha deve conter maiúsculas, minúsculas, número e símbolo.');

    try {
      const payload: RegisterData = {
        nome: nomeCadastro,
        email: emailCadastro,
        senha: senhaCadastro,
        senhaConfirmacao: confirmSenha,
      };
      await cadastroService.register(payload);
      window.alert('Cadastro realizado!');
      setIsRightPanelActive(false);
    } catch {
      window.alert('Erro ao cadastrar.');
    }
  };

  return (
    <div className={`auth-container ${isRightPanelActive ? 'right-panel-active' : ''}`}>
      {/* Painel de Login */}
      <div className="form-container sign-in-container">
        <div className="form-content">
          <h2>Entrar</h2>
          <input
            type="email"
            placeholder="Digite seu email"
            value={emailLogin}
            onChange={(e) => setEmailLogin(e.target.value)}
          />
          <div className="input-wrapper">
            <input
              type={showSenhaLogin ? 'text' : 'password'}
              placeholder="Digite sua senha"
              value={senhaLogin}
              onChange={(e) => setSenhaLogin(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowSenhaLogin(!showSenhaLogin)}
              className="eye-button"
            >
              {showSenhaLogin ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button className="btn-primary" onClick={handleLogin}>
            Entrar
          </button>
        </div>
      </div>

      {/* Painel de Cadastro */}
      <div className="form-container sign-up-container">
        <div className="form-content">
          <h2>Criar uma conta</h2>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nomeCadastro}
            onChange={(e) => setNomeCadastro(e.target.value)}
          />
          <input
            type="email"
            placeholder="Digite seu email"
            value={emailCadastro}
            onChange={(e) => setEmailCadastro(e.target.value)}
          />
          <div className="input-wrapper">
            <input
              type={showSenhaCadastro ? 'text' : 'password'}
              placeholder="Digite sua senha"
              value={senhaCadastro}
              onChange={(e) => setSenhaCadastro(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowSenhaCadastro(!showSenhaCadastro)}
              className="eye-button"
            >
              {showSenhaCadastro ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="input-wrapper">
            <input
              type={showConfirmSenha ? 'text' : 'password'}
              placeholder="Confirme sua senha"
              value={confirmSenha}
              onChange={(e) => setConfirmSenha(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmSenha(!showConfirmSenha)}
              className="eye-button"
            >
              {showConfirmSenha ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button className="btn-primary" onClick={handleCadastro}>
            Cadastrar
          </button>
        </div>
      </div>

      {/* Overlay animado */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Bem-vindo de volta!</h1>
            <p>Já possui conta? Faça login para continuar.</p>
            <button className="ghost" onClick={() => setIsRightPanelActive(false)}>
              Entrar
            </button>
          </div>

          <div className="overlay-panel overlay-right">
            <h1>Olá amigo!</h1>
            <p>Faça seu cadastro e comece sua jornada conosco.</p>
            <button className="ghost" onClick={() => setIsRightPanelActive(true)}>
              Criar conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
