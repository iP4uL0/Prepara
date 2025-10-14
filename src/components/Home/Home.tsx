import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { scoreService } from '../../service/score.service';
import type { RankingUser } from '../../types';
import './Home.css';

const Home: React.FC = () => {
  const [ranking, setRanking] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRanking();
  }, []);

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
      console.error('Erro ao carregar ranking:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <header>
        <nav>
          <Link to="/login" className="btn">Login</Link>
        </nav>
      </header>

      <main>
        <section className="title">
          <h1>Projeto<br />Quiz</h1>
          <p className="subtitle">
            Este projeto foi desenvolvido como uma forma interativa de estudar para o <strong>ENEM</strong>.
            Aqui, você pode testar seus conhecimentos em diversas áreas, responder questões de forma dinâmica
            e acompanhar sua evolução através do ranking de pontuações.
          </p>
          <p className="subtitle">
            O objetivo é tornar o aprendizado mais divertido e motivador, incentivando a prática constante
            e ajudando a revisar conteúdos de maneira rápida e eficiente.
          </p>
        </section>

        <section className="ranking">
          <h2>🏆 Ranking</h2>
          <ul id="ranking-list">
            {loading ? (
              <li className="ranking-item">Carregando...</li>
            ) : ranking.length > 0 ? (
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
        </section>
      </main>
    </div>
  );
};

export default Home;