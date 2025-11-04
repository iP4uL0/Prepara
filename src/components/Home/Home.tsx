import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { scoreService } from "../../service/score.service";
import type { RankingUser } from "../../types";
import "./Home.css";
const Home: React.FC = () => {
  const [ranking, setRanking] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRanking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadRanking = async () => {
    try {
      const data = await scoreService.getRanking();
      if (Array.isArray(data) && data.length > 0) {
        const sortedRanking = data
          .sort((a, b) => b.total_acertos - a.total_acertos)
          .slice(0, 5);
        setRanking(sortedRanking);
      } else {
        setRanking([]);
      }
    } catch (error) {
      console.error("Erro ao carregar ranking:", error);
      setRanking([]);
    } finally {
      setLoading(false);
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <nav className="home-nav">
          <button className="hamburger-menu" onClick={toggleMenu} aria-label="Menu">
            <span className="hamburger-icon">☰</span>
          </button>
          <div className={`menu-items ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/login" className="btn-login">
              Login
            </Link>

            <div className="provas-buttons">
                <a
                href="https://vestibular.brasilescola.uol.com.br/downloads/universidade-estadual-paulista.htm?utm_source=chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="prova-btn"
              >
                UNESP
              </a>

                <a
                  href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos?utm_source=chatgpt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prova-btn"
                >
                  ENEM 
                </a>

                <a
                  href="https://www.fuvest.br/acervo-vestibular"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prova-btn"
                >
                  USP 
                </a>
              
                <a
                  href="https://vestibular.brasilescola.uol.com.br/downloads/universidade-estadual-campinas.htm?utm_source=chatgpt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prova-btn"
                >
                UNICAMP
                </a>

                <a
                  href="https://vestibular.brasilescola.uol.com.br/downloads/universidade-estado-rio-janeiro-1.htm?utm_source=chatgpt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prova-btn"
                >
                UERJ
                </a>

                     <a
                  href="https://vestibular.brasilescola.uol.com.br/downloads/universidade-estado-rio-janeiro-1.htm?utm_source=chatgpt.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="prova-btn"
                >
                UFPR
                </a>
            </div>
          </div>
        </nav>
      </header>

      <main className="home-main">
        {/* --- Banner grande --- */}
        <section className="banner-wrap">
          <div className="banner-overlay">
            <h1>Alcance seus objetivos acadêmicos com o</h1>
            <h2>PreparaVest!</h2>
          </div>
          <div className="banner-card">
            <img
              src="/imagens/BannerPrincipal.jpeg"
              alt="Banner Preparavest"
              className="banner-image"
            />
          </div>
        </section>

        {/* --- Boas-vindas / descrição --- */}
        <section className="welcome">
          <div className="welcome-card">
            <h3>Bem-vindo ao Preparavest</h3>
            <p>
              Encontre tudo o que você precisa para se preparar para o
              vestibular: conteúdos, provas anteriores, informações gerais,
              dicas de estudos e estatísticas.
            </p>
          </div>
        </section>
        <section className="contents-section">
          <h4>Nossos Conteúdos</h4>
          <div className="cards-row">
            <article className="content-card">
              <div className="card-icon">📚</div>
              <h5>Conteúdos por Matéria</h5>
              <p>
                Acesse resumos e dicas dos principais conteúdos cobrados em
                vestibulares.
              </p>
            </article>

            <article className="content-card">
              <div className="card-icon">📝</div>
              <h5>Provas Anteriores</h5>
              <p>
                Baixe e resolva provas anteriores de vestibulares renomados.
              </p>

            </article>

            <article className="content-card">
              <div className="card-icon">ℹ️</div>
              <h5>Informações Gerais</h5>
              <p>Tudo que você precisa saber sobre os vestibulares.</p>
            </article>
          </div>
        </section>

        {/* --- Estatísticas (fundo azul) --- */}
        <section className="stats-section">
          <div className="stats-card">
            <h4>Estatísticas do Vestibular</h4>
            <div className="stats-row">
              <div className="stat-box">
                <strong>50%</strong>
                <p>das questões de Matemática são relacionadas a Funções.</p>
              </div>
              <div className="stat-box">
                <strong>30%</strong>
                <p>
                  das provas de Ciências Humanas abordam temas de Geopolítica.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Dicas de Estudo --- */}
        <section className="tips-section">
          <h4>Dicas de Estudo</h4>
          <div className="tips-row">
            <div className="tip-card">
              <div className="tip-star">★</div>
              <p>
                Crie um cronograma de estudos e dedique mais tempo às suas
                matérias de dificuldade.
              </p>
            </div>
            <div className="tip-card">
              <div className="tip-star">★</div>
              <p>
                Resolva o máximo de questões de provas anteriores para se
                acostumar com o formato.
              </p>
            </div>
          </div>
        </section>

        {/* --- Ranking (última seção) --- */}
        <section className="ranking-section">
          <h4>🏆 Ranking</h4>
          <div className="ranking-card">
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
                <li className="ranking-item">
                  Nenhum usuário no ranking ainda
                </li>
              )}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
