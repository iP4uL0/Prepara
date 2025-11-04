import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { quizService } from '../../service/quiz.service';
import type { Question } from '../../types';
import './Admin.css';


const Admin: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [formData, setFormData] = useState({
    enunciado: '',
    alt_a: '',
    alt_b: '',
    alt_c: '',
    alt_d: '',
    alt_e: '',
    correta: 'a',
    imagem: null
  }); 


  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.funcao !== '2') {
      navigate('/login', { replace: true });
      return;
    }
    loadQuestions();
  }, [user, navigate]);

  const loadQuestions = async () => {
    try {
      const data = await quizService.getQuestions();
      setQuestions(data || []);
    } catch (error) {
      console.error('Erro ao carregar questões:', error);
      setMessage('Erro ao carregar questões.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.enunciado.trim()) {
      setMessage('Por favor, preencha o enunciado da questão.');
      return;
    }

    if (!formData.alt_a.trim() || !formData.alt_b.trim() || !formData.alt_c.trim() || 
        !formData.alt_d.trim() || !formData.alt_e.trim()) {
      setMessage('Por favor, preencha todas as alternativas.');
      return;
    }

    try {
      if (editingQuestion) {
        // Atualizar questão existente
        await quizService.updateQuestion(editingQuestion.id_quest, formData);
        setMessage('Questão atualizada com sucesso!');
        setEditingQuestion(null);
      } else {
        // Criar nova questão
        await quizService.createQuestion(formData);
        setMessage('Questão adicionada com sucesso!');
      }
      
      // Limpar formulário
      setFormData({
        enunciado: '',
        alt_a: '',
        alt_b: '',
        alt_c: '',
        alt_d: '',
        alt_e: '',
        correta: 'a',
        imagem: null
      });
      
      // Recarregar questões
      await loadQuestions();
      
      // Limpar mensagem após 3 segundos
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Erro ao salvar questão:', error);
      setMessage('Erro ao salvar questão.');
    }
  };

  const handleEdit = (question: Question) => {
    setEditingQuestion(question);
    setFormData({
      enunciado: question.enunciado,
      alt_a: question.alt_a,
      alt_b: question.alt_b,
      alt_c: question.alt_c,
      alt_d: question.alt_d,
      alt_e: question.alt_e,
      correta: question.correta,
      imagem: null
    });
    // Scroll para o formulário
    document.getElementById('question-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta questão?')) {
      try {
        await quizService.deleteQuestion(id);
        setMessage('Questão excluída com sucesso!');
        await loadQuestions();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        console.error('Erro ao excluir questão:', error);
        setMessage('Erro ao excluir questão.');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
    setFormData({
      enunciado: '',
      alt_a: '',
      alt_b: '',
      alt_c: '',
      alt_d: '',
      alt_e: '',
      correta: 'a',
      imagem: null
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  if (loading) {
    return <div className="admin-container">Carregando...</div>;
  }

  return (
    <div className="admin-container">
      <div className="logo-container">
        <img src="/imagens/icone.png" alt="Ícone Quiz" className="logo" />
      </div>

      <div className="nav-buttons">
        <button className="logout-btn" onClick={handleLogout}>
          Sair
        </button>
        <Link to="/" className="home-btn">
          Home
        </Link>
      </div>

      <div className="title">
        <h1>Painel Administrativo</h1>
        <p>Gerencie as questões do quiz</p>
      </div>

      {message && (
        <div className={`message ${message.includes('Erro') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="admin-content">
        <div className="form-section">
          <h2>{editingQuestion ? 'Editar Questão' : 'Adicionar Nova Questão'}</h2>
          
          <form id="question-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="enunciado">Enunciado da Questão:</label>
              <textarea
                id="enunciado"
                name="enunciado"
                value={formData.enunciado}
                onChange={handleInputChange}
                placeholder="Digite o enunciado da questão..."
                rows={4}
                required
              />
            </div>

            <div className="alternatives-grid">
              <div className="form-group">
                <label htmlFor="alt_a">Alternativa A:</label>
                <input
                  type="text"
                  id="alt_a"
                  name="alt_a"
                  value={formData.alt_a}
                  onChange={handleInputChange}
                  placeholder="Digite a alternativa A"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="alt_b">Alternativa B:</label>
                <input
                  type="text"
                  id="alt_b"
                  name="alt_b"
                  value={formData.alt_b}
                  onChange={handleInputChange}
                  placeholder="Digite a alternativa B"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="alt_c">Alternativa C:</label>
                <input
                  type="text"
                  id="alt_c"
                  name="alt_c"
                  value={formData.alt_c}
                  onChange={handleInputChange}
                  placeholder="Digite a alternativa C"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="alt_d">Alternativa D:</label>
                <input
                  type="text"
                  id="alt_d"
                  name="alt_d"
                  value={formData.alt_d}
                  onChange={handleInputChange}
                  placeholder="Digite a alternativa D"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="alt_e">Alternativa E:</label>
                <input
                  type="text"
                  id="alt_e"
                  name="alt_e"
                  value={formData.alt_e}
                  onChange={handleInputChange}
                  placeholder="Digite a alternativa E"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="correta">Resposta Correta:</label>
              <select
                id="correta"
                name="correta"
                value={formData.correta}
                onChange={handleInputChange}
                required
              >
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
                <option value="e">E</option>
              </select>
            </div>

            <div className="form-buttons">
              <button type="submit" className="submit-btn">
                {editingQuestion ? 'Atualizar Questão' : 'Adicionar Questão'}
              </button>
              {editingQuestion && (
                <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
                  Cancelar Edição
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="questions-section">
          <h2>Questões Cadastradas ({questions.length})</h2>
          
          {questions.length === 0 ? (
            <p className="no-questions">Nenhuma questão cadastrada ainda.</p>
          ) : (
            <div className="questions-list">
              {questions.map((question, index) => (
                <div key={question.id_quest} className="question-card">
                  <div className="question-header">
                    <h3>Questão {index + 1}</h3>
                    <div className="question-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(question)}
                        title="Editar questão"
                      >
                        ✏️
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(question.id_quest)}
                        title="Excluir questão"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  
                  <div className="question-content">
                    <p className="question-text">{question.enunciado}</p>
                    
                    <div className="alternatives">
                      <div className={`alternative ${question.correta === 'a' ? 'correct' : ''}`}>
                        <strong>A)</strong> {question.alt_a}
                      </div>
                      <div className={`alternative ${question.correta === 'b' ? 'correct' : ''}`}>
                        <strong>B)</strong> {question.alt_b}
                      </div>
                      <div className={`alternative ${question.correta === 'c' ? 'correct' : ''}`}>
                        <strong>C)</strong> {question.alt_c}
                      </div>
                      <div className={`alternative ${question.correta === 'd' ? 'correct' : ''}`}>
                        <strong>D)</strong> {question.alt_d}
                      </div>
                      <div className={`alternative ${question.correta === 'e' ? 'correct' : ''}`}>
                        <strong>E)</strong> {question.alt_e}
                      </div>
                    </div>
                    
                    <div className="correct-answer">
                      <strong>Resposta Correta: {question.correta.toUpperCase()}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;