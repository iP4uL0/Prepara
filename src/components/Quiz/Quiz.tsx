import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { quizService } from "../../service/quiz.service";
import { scoreService } from "../../service/score.service";
import type { Question, UserAnswer, RankingUser } from "../../types";
import "./Quiz.css";

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [ranking, setRanking] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const QUESTION_LIMIT = 10;

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    loadQuestions();
    loadRanking();
  }, [user, navigate]);

  const loadQuestions = async () => {
    try {
      const data = await quizService.getQuestions();
      if (data && data.length > 0) {
        const shuffled = data.sort(() => 0.5 - Math.random());
        setQuestions(shuffled.slice(0, QUESTION_LIMIT));
      } else {
        setMessage("Nenhuma questão disponível.");
      }
    } catch (error) {
      console.error("Erro ao carregar questões:", error);
      setMessage("Erro ao carregar questões.");
    } finally {
      setLoading(false);
    }
  };

  const loadRanking = async () => {
    try {
      const data = await scoreService.getRanking();
      if (Array.isArray(data) && data.length > 0) {
        const sortedRanking = data
          .sort((a, b) => b.total_acertos - a.total_acertos)
          .slice(0, 5);
        setRanking(sortedRanking);
      }
    } catch (error) {
      console.error("Erro ao carregar ranking:", error);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = async () => {
    if (!selectedAnswer) {
      alert("Por favor, selecione uma resposta.");
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const newAnswer: UserAnswer = {
      id_quest: currentQuestion.id_quest,
      resposta: selectedAnswer.replace("alt_", ""),
    };

    const updatedAnswers = [...userAnswers];
    const existingAnswerIndex = updatedAnswers.findIndex(
      (answer) => answer.id_quest === currentQuestion.id_quest
    );

    if (existingAnswerIndex >= 0) {
      updatedAnswers[existingAnswerIndex] = newAnswer;
    } else {
      updatedAnswers.push(newAnswer);
    }

    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex === questions.length - 1) {
      await finishQuiz(updatedAnswers);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      const nextQuestion = questions[currentQuestionIndex + 1];
      const savedAnswer = updatedAnswers.find(
        (answer) => answer.id_quest === nextQuestion.id_quest
      );
      setSelectedAnswer(savedAnswer ? `alt_${savedAnswer.resposta}` : "");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      const prevQuestion = questions[currentQuestionIndex - 1];
      const savedAnswer = userAnswers.find(
        (answer) => answer.id_quest === prevQuestion.id_quest
      );
      setSelectedAnswer(savedAnswer ? `alt_${savedAnswer.resposta}` : "");
    }
  };

  const finishQuiz = async (answers: UserAnswer[]) => {
    setIsFinished(true);

    if (user) {
      try {
        const response = await scoreService.submitAnswers(
          user.id_user,
          answers
        );

        if (response?.data?.acertosTentativa !== undefined) {
          setScore(response.data.acertosTentativa);
        } else {
          console.warn("Resposta inesperada do servidor:", response.data);
          setScore(0);
        }

        await loadRanking();
      } catch (error) {
        console.error("Erro ao enviar respostas:", error);
        setScore(0);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer("");
    setScore(0);
    setIsFinished(false);
    setMessage("");
    loadQuestions();
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (loading) {
    return <div className="quiz-container">Carregando...</div>;
  }

  if (questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="message">
          {message || "Nenhuma questão disponível."}
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <div className="logo-container">
        <img src="/imagens/icone.png" alt="Ícone Quiz" className="logo" />
      </div>

      <div className="nav-buttons">
        <button className="logout-btn" onClick={handleLogout}>
          Sair
        </button>
      </div>

      <div className="title">
        <h1>Quiz - ENEM</h1>
      </div>

      {!isFinished ? (
        <div id="quiz">
          <div id="contador">
            Questão {currentQuestionIndex + 1} de {questions.length}
          </div>

          <div id="questao">{currentQuestion.enunciado}</div>

          <div id="opcoes">
            {["alt_a", "alt_b", "alt_c", "alt_d", "alt_e"].map(
              (option, index) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="resposta"
                    value={option}
                    checked={selectedAnswer === option}
                    onChange={(e) => handleAnswerSelect(e.target.value)}
                  />
                  {String.fromCharCode(65 + index)}){" "}
                  {currentQuestion[option as keyof Question]}
                </label>
              )
            )}
          </div>

          <div className="quiz-buttons">
            <button
              type="button"
              id="voltar"
              onClick={handlePrevious}
              style={{ display: currentQuestionIndex > 0 ? "block" : "none" }}>
              ← Voltar
            </button>
            <button type="button" id="proximo" onClick={handleNext}>
              {currentQuestionIndex === questions.length - 1
                ? "Finalizar"
                : "Próximo →"}
            </button>
          </div>
        </div>
      ) : (
        <div id="quiz">
          <div className="result">
            <h2>Quiz Finalizado!</h2>
            <div id="acertos">
              Você acertou {score} de {questions.length} questões!
            </div>
            <div className="score-percentage">
              Nota: {((score / questions.length) * 10).toFixed(1)}
            </div>
            <button type="button" id="reiniciar" onClick={restartQuiz}>
              Reiniciar Quiz
            </button>
          </div>
        </div>
      )}

      <div className="ranking">
        <h2>🏆 Ranking</h2>
        <ul>
          {ranking.length > 0 ? (
            ranking.map((user, index) => (
              <li key={index} className="ranking-item">
                <span className="nome-container">
                  {index + 1}º - {user.nome}
                </span>
                <span className="pontuacao-container">
                  Pontuação Final:
                  <span className="pontos"> {user.total_acertos}</span>
                </span>
              </li>
            ))
          ) : (
            <li className="ranking-item">Nenhum usuário no ranking ainda</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Quiz;
