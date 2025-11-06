import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { scoreService } from "../../service/score.service";
import type { RankingUser } from "../../types";
import "./Home.css";
// Importações de ícones e tema
import { FaLinkedin, FaYoutube } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

/* --- COMPONENTE ACCORDION ATUALIZADO --- */
interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="accordion-item">
      <button
        className={`accordion-header ${expanded ? "active" : ""}`}
        onClick={() => setExpanded(!expanded)}>
        <span className="accordion-title">{title}</span>
        {/* O ícone agora é sempre '+' e será girado pelo CSS */}
        <span className="accordion-arrow">+</span>
      </button>
      <div className={`accordion-content ${expanded ? "expanded" : ""}`}>
        <div className="accordion-content-inner">{children}</div>
      </div>
    </div>
  );
};
/* --- FIM DO COMPONENTE ACCORDION --- */

const Home: React.FC = () => {
  const [ranking, setRanking] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProvasModalOpen, setIsProvasModalOpen] = useState(false); // Modal de Provas
  const [isConteudosModalOpen, setIsConteudosModalOpen] = useState(false); // Modal de Conteúdos
  const { toggleTheme, isDarkMode } = useTheme();

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

  // Funções do modal de Provas
  const openProvasModal = () => setIsProvasModalOpen(true);
  const closeProvasModal = () => setIsProvasModalOpen(false);

  // Funções do modal de Conteúdos
  const openConteudosModal = () => setIsConteudosModalOpen(true);
  const closeConteudosModal = () => setIsConteudosModalOpen(false);

  return (
    <div className="home-container">
      <header className="home-header">
        <nav className="home-nav">
          {/* --- Botão de Tema --- */}
          <div className="theme-toggle-container">
            <button id="MudarTema" onClick={toggleTheme}>
              <img
                src={
                  isDarkMode
                    ? "https://cdn-icons-png.freepik.com/256/6714/6714978.png?semt=ais_hybrid"
                    : "https://cdn-icons-png.freepik.com/256/544/544209.png?semt=ais_hybrid"
                }
                alt="Mudar tema"
              />
            </button>
          </div>

          {/* --- Botão de Login --- */}
          <Link to="/login" className="btn-login">
            Venha Jogar
          </Link>
        </nav>
      </header>

      <main className="home-main">
        <section className="banner-wrap">
          <div className="banner-overlay">
            <h1>Alcance seus objetivos acadêmicos com o</h1>
            <h2>PreparaVest!</h2>
          </div>
          <div className="banner-card">
            <img
              src="./imagens/banner.png"
              alt="Banner Preparavest"
              className="banner-image"
            />
          </div>
        </section>

        <section className="welcome">
          <div className="welcome-card">
            <h3>Bem-vindo ao Preparavest</h3>
            <p>
              Encontre tudo o que você precisa para se preparar para o
              vestibular: conteúdos, provas anteriores, informações gerais,
              dicas de estudos e estatísticas.
              <br></br>
              <br />
              <b>
                VENHA TESTAR SEU CONHECIMENTO EM NOSSO QUIZ! FAÇA LOGIN PARA
                ACESSAR.
              </b>
            </p>
          </div>
        </section>

        <section className="contents-section">
          <h4>Nossos Conteúdos</h4>
          <div className="cards-row">
            {/* --- CARD ATUALIZADO --- */}
            <article
              className="content-card content-card-button"
              onClick={openConteudosModal} // ATUALIZADO
            >
              <div className="card-icon">📚</div>
              <h5>Conteúdos por Matéria</h5>
              <p>
                Acesse resumos e dicas dos principais conteúdos cobrados em
                vestibulares.
              </p>
            </article>

            <article
              className="content-card content-card-button"
              onClick={openProvasModal} // ATUALIZADO
            >
              <div className="card-icon">📝</div>
              <h5>Provas Anteriores</h5>
              <p>
                Baixe e resolva provas anteriores de vestibulares renomados.
              </p>
            </article>

            {/* --- CARD ÂNCORA --- */}
            <a href="#info-gerais-secao" className="card-anchor-link">
              <article className="content-card">
                <div className="card-icon">ℹ️</div>
                <h5>Informações Gerais</h5>
                <p>Tudo que você precisa saber sobre os vestibulares.</p>
              </article>
            </a>
          </div>
        </section>

        {/* --- SEÇÃO DE ESTATÍSTICAS COM ID --- */}
        <section id="info-gerais-secao" className="stats-section">
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
              {/* --- NOVO CARD 1 --- */}
              <div className="stat-box">
                <strong>40%</strong>
                <p>
                  das questões de Linguagens focam em Interpretação de Texto e
                  Variações Linguísticas.
                </p>
              </div>
              {/* --- NOVO CARD 2 --- */}
              <div className="stat-box">
                <strong>25%</strong>
                <p>
                  das provas de Natureza (Biologia/Física/Química) abordam temas
                  de Ecologia.
                </p>
              </div>
            </div>
          </div>
        </section>

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

      {/* --- Modal de Provas (Existente) --- */}
      {isProvasModalOpen && (
        <div className="modal-backdrop" onClick={closeProvasModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeProvasModal}>
              &times;
            </button>
            <h4>Provas Anteriores</h4>
            <div className="provas-buttons-modal">
              <a
                href="https://vestibular.brasilescola.uol.com.br/downloads/universidade-estadual-paulista.htm?utm_source=chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="prova-btn">
                UNESP
              </a>
              <a
                href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos?utm_source=chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="prova-btn">
                ENEM
              </a>
              <a
                href="https://www.fuvest.br/acervo-vestibular"
                target="_blank"
                rel="noopener noreferrer"
                className="prova-btn">
                USP
              </a>
              <a
                href="https://vestibular.brasilescola.uol.com.br/downloads/universidade-estadual-campinas.htm?utm_source=chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="prova-btn">
                UNICAMP
              </a>
              <a
                href="https://vestibular.brasilescola.uol.com.br/downloads/universidade-estado-rio-janeiro-1.htm?utm_source=chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="prova-btn">
                UERJ
              </a>
              <a
                href="https://vestibular.brasilescola.uol.com.br/downloads/universidade-estado-rio-janeiro-1.htm?utm_source=chatgpt.com"
                target="_blank"
                rel="noopener noreferrer"
                className="prova-btn">
                UFPR
              </a>
            </div>
          </div>
        </div>
      )}

      {/* --- NOVO MODAL DE CONTEÚDOS --- */}
      {isConteudosModalOpen && (
        <div className="modal-backdrop" onClick={closeConteudosModal}>
          <div
            className="modal-content modal-content-large"
            onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeConteudosModal}>
              &times;
            </button>
            <h4>Conteúdos Relevantes</h4>
            <div className="accordion-container">
              {/* --- Item 1: Linguagens --- */}
              <AccordionItem title="Linguagens, Códigos e suas Tecnologias">
                <h5 className="conteudo-titulo">LÍNGUA PORTUGUESA</h5>
                <p className="conteudo-texto">
                  - Interpretação de Textos: Habilidade de compreender e
                  analisar diferentes tipos de textos, considerando contexto,
                  intenção do autor e público-alvo.
                </p>
                <p className="conteudo-texto">
                  - Tendências Contemporâneas: Exploração das novas formas de
                  comunicação e expressão na língua, influenciadas por
                  tecnologia e mudanças sociais.
                </p>
                <p className="conteudo-texto">
                  - Estrutura e Formação das Palavras: Estudo da morfologia,
                  incluindo raízes, prefixos e sufixos, essencial para entender
                  a formação e flexão das palavras.
                </p>
                <p className="conteudo-texto">
                  - Tipos de Texto: Análise de diferentes tipos textuais
                  (narrativos, descritivos, expositivos, argumentativos e
                  injuntivos) e suas características estruturais.
                </p>
                <p className="conteudo-texto">
                  - Análise da Pessoa, do Espaço e do Tempo: Estudo dos
                  elementos narrativos que afetam a construção do significado em
                  um texto.
                </p>
                <p className="conteudo-texto">
                  - Funções da Linguagem: Compreensão das diversas funções da
                  linguagem (referencial, emotiva, conativa, metalingüística,
                  fática e poética).
                </p>
                <p className="conteudo-texto">
                  - Pontuação: Importância da pontuação na clareza e
                  interpretação do texto, definindo pausas e entonações.
                </p>
                <p className="conteudo-texto">
                  - Narratividade: Análise da estrutura das histórias, incluindo
                  enredo, personagens, conflito e desfecho.
                </p>
                <p className="conteudo-texto">
                  - Literatura: Estudo de obras literárias, seus estilos, temas
                  e contextos históricos, refletindo a cultura e a experiência
                  humana.
                </p>
                <p className="conteudo-texto">
                  - Classe de Palavras: Classificação gramatical das palavras
                  (substantivos, verbos, adjetivos, etc.) e suas funções.
                </p>
                <p className="conteudo-texto">
                  - Verbo: Estudo das conjugações, tempos, modos e aspectos
                  verbais, fundamentais para a construção de frases.
                </p>

                <h5 className="conteudo-titulo">INGLÊS</h5>
                <p className="conteudo-texto">
                  - Interpretação de Textos: Compreensão e análise de textos em
                  inglês, considerando contextos culturais e históricos.
                </p>
                <p className="conteudo-texto">
                  - Domínio Lexical: Conhecimento do vocabulário, incluindo
                  conotações e denotações, essencial para comunicação eficaz.
                </p>
                <p className="conteudo-texto">
                  - Identificação da Função do Texto: Entendimento do propósito
                  do texto (informar, persuadir, entreter) e sua estrutura.
                </p>

                <h5 className="conteudo-titulo">ARTES</h5>
                <p className="conteudo-texto">
                  - Arte Contemporânea: Estudo da arte produzida desde o final
                  do século XX, marcada pela diversidade de estilos e novas
                  mídias.
                </p>
                <p className="conteudo-texto">
                  - Arte nos Séculos XV e XVI: Análise do Renascimento, focando
                  no humanismo e na perspectiva, com artistas como Leonardo da
                  Vinci e Michelangelo.
                </p>
                <p className="conteudo-texto">
                  - Elementos Básicos das Artes Plásticas: Compreensão de linha,
                  forma, cor, textura, espaço e composição como fundamentos da
                  criação artística.
                </p>
                <p className="conteudo-texto">
                  - Elementos Básicos de Música: Estudo de melodia, harmonia,
                  ritmo, timbre e forma, essenciais para a construção e
                  apreciação musical.
                </p>
                <p className="conteudo-texto">
                  - Música no Século XX: Análise da diversidade de estilos e
                  gêneros que emergiram, refletindo mudanças sociais e
                  tecnológicas.
                </p>
              </AccordionItem>

              {/* --- Item 2: Matemática --- */}
              <AccordionItem title="Matemática e suas Tecnologias">
                <h5 className="conteudo-titulo">MATEMÁTICA</h5>
                <p className="conteudo-texto">
                  - Geometria Plana: Estudo das figuras bidimensionais, suas
                  propriedades, medidas e relações, incluindo ângulos,
                  triângulos, quadriláteros e círculos.
                </p>
                <p className="conteudo-texto">
                  - Geometria Espacial: Análise das figuras tridimensionais,
                  como prismas, cilindros, pirâmides, cones e esferas, e seus
                  volumes e áreas.
                </p>
                <p className="conteudo-texto">
                  - Geometria Analítica: Estudo das figuras geométricas
                  utilizando um sistema de coordenadas, incluindo retas, planos
                  e cônicas (círculos, elipses, hipérboles).
                </p>
                <p className="conteudo-texto">
                  - Equação do Primeiro Grau e Equação do Segundo Grau:
                  Resolução e aplicações de equações lineares e quadráticas,
                  incluindo gráficos e soluções.
                </p>
                <p className="conteudo-texto">
                  - Escalas, Razão e Proporção: Compreensão das relações entre
                  grandezas, incluindo a utilização de escalas em mapas e
                  maquetes.
                </p>
                <p className="conteudo-texto">
                  - Grandezas Proporcionais e Médias Algébricas: Estudo de
                  grandezas diretamente e inversamente proporcionais, além do
                  cálculo de médias.
                </p>
                <p className="conteudo-texto">
                  - Aritmética: Fundamentos das operações matemáticas básicas,
                  incluindo adição, subtração, multiplicação e divisão.
                </p>
                <p className="conteudo-texto">
                  - Porcentagem e Matemática Financeira: Cálculos envolvendo
                  porcentagens, juros simples e compostos, e aplicações
                  financeiras.
                </p>
                <p className="conteudo-texto">
                  - Gráficos e Tabelas: Interpretação e construção de gráficos e
                  tabelas, representando dados de forma visual e clara.
                </p>
                <p className="conteudo-texto">
                  - Funções: Estudo de funções matemáticas, suas
                  características, gráficos e aplicações em diferentes
                  contextos.
                </p>
                <p className="conteudo-texto">
                  - Trigonometria: Análise das relações entre os ângulos e os
                  lados dos triângulos, incluindo funções trigonométricas (seno,
                  cosseno, tangente) e suas aplicações.
                </p>
                <p className="conteudo-texto">
                  - Noções Básicas de Estatística: Introdução a conceitos
                  estatísticos, incluindo média, mediana, moda e desvio padrão.
                </p>
                <p className="conteudo-texto">
                  - Probabilidade: Análise das chances de ocorrência de eventos,
                  incluindo eventos independentes e dependentes.
                </p>
                <p className="conteudo-texto">
                  - Área de Figuras Planas e Área dos Polígonos: Cálculo de
                  áreas de diversas figuras planas, com ênfase em polígonos e
                  fórmulas específicas.
                </p>
              </AccordionItem>

              {/* --- Item 3: Ciências Humanas --- */}
              <AccordionItem title="Ciências Humanas e suas Tecnologias">
                <h5 className="conteudo-titulo">HISTÓRIA</h5>
                <p className="conteudo-texto">
                  - Idade Contemporânea: Estudo do período histórico que vai do
                  final do século XVIII até os dias atuais, abrangendo
                  transformações sociais, políticas e econômicas.
                </p>
                <p className="conteudo-texto">
                  - 2ª Guerra Mundial e Suas Consequências: Análise do conflito
                  global de 1939 a 1945, suas causas, eventos principais e
                  impacto nas relações internacionais e na geopolítica.
                </p>
                <p className="conteudo-texto">
                  - Brasil Colônia: Exploração do período colonial brasileiro
                  (1500-1822), incluindo aspectos sociais, econômicos e
                  culturais da colonização portuguesa.
                </p>
                <p className="conteudo-texto">
                  - Primeiro e Segundo Reinado: Estudo dos reinados de Dom Pedro
                  I e Dom Pedro II, focando nas transformações políticas,
                  sociais e econômicas do Brasil imperial.
                </p>
                <p className="conteudo-texto">
                  - Governos Pós-Regime Militar - Redemocratização: Análise do
                  processo de redemocratização no Brasil após 1985, incluindo a
                  Constituição de 1988 e as mudanças políticas.
                </p>
                <p className="conteudo-texto">
                  - Era Vargas: Estudo do governo de Getúlio Vargas (1930-1945),
                  suas políticas econômicas, sociais e a influência no Brasil
                  moderno.
                </p>
                <p className="conteudo-texto">
                  - História Política: Compreensão dos principais eventos,
                  movimentos e ideologias que moldaram a política brasileira ao
                  longo da história.
                </p>
                <p className="conteudo-texto">
                  - República Velha: Análise do período republicano (1889-1930),
                  suas características, crises e a política do café com leite.
                </p>
                <p className="conteudo-texto">
                  - Patrimônio Histórico-Cultural e Memória: Reflexão sobre a
                  importância da preservação do patrimônio cultural e a
                  construção da memória coletiva na sociedade.
                </p>

                <h5 className="conteudo-titulo">GEOGRAFIA</h5>
                <p className="conteudo-texto">
                  - Geografia Agrária: Estudo da organização do espaço rural,
                  atividades agrícolas e relações entre sociedade e natureza.
                </p>
                <p className="conteudo-texto">
                  - Questões Ambientais: Análise dos problemas ambientais
                  contemporâneos, como poluição, desmatamento e mudanças
                  climáticas.
                </p>
                <p className="conteudo-texto">
                  - Geografia Física: Compreensão dos elementos naturais do
                  planeta, como relevo, clima, vegetação e recursos hídricos.
                </p>
                <p className="conteudo-texto">
                  - Geografia Urbana: Estudo das dinâmicas das cidades,
                  urbanização, e os problemas sociais e ambientais urbanos.
                </p>
                <p className="conteudo-texto">
                  - Climatologia: Análise dos climas do mundo, suas
                  características e a influência das condições climáticas na
                  vida humana.
                </p>
                <p className="conteudo-texto">
                  - Urbanização: Estudo do processo de crescimento urbano e suas
                  implicações sociais, econômicas e ambientais.
                </p>
                <p className="conteudo-texto">
                  - Globalização: Compreensão das interconexões econômicas,
                  culturais e políticas entre países e regiões do mundo.
                </p>
                <p className="conteudo-texto">
                  - Cartografia: Estudo das representações cartográficas,
                  técnicas de mapeamento e a importância dos mapas.
                </p>
                <p className="conteudo-texto">
                  - Indústria: Análise da atividade industrial, seus tipos,
                  localização e impacto na economia e no meio ambiente
                </p>

                <h5 className="conteudo-titulo">FILOSOFIA</h5>
                <p className="conteudo-texto">
                  - Aristóteles e Escola Helenística: Estudo do pensamento
                  aristotélico e suas influências nas escolas filosóficas
                  posteriores.
                </p>
                <p className="conteudo-texto">
                  - Ética e Justiça: Reflexão sobre conceitos de moralidade,
                  justiça e suas aplicações na sociedade.
                </p>
                <p className="conteudo-texto">
                  - Racionalismo Moderno: Análise das ideias de filósofos como
                  Descartes e a importância da razão no conhecimento.
                </p>
                <p className="conteudo-texto">
                  - Filosofia Antiga: Estudo das principais correntes e
                  pensadores da filosofia grega, incluindo pré-socráticos e
                  estoicos.
                </p>
                <p className="conteudo-texto">
                  - Escola Sofística, Sócrates e Platão: Análise das
                  contribuições dos sofistas, Sócrates e Platão para a filosofia
                  ocidental.
                </p>
                <p className="conteudo-texto">
                  - Filosofia Contemporânea: Estudo das correntes filosóficas do
                  século XX e XXI, abordando questões atuais.
                </p>
                <p className="conteudo-texto">
                  - Natureza do Conhecimento: Reflexão sobre a epistemologia,
                  incluindo questões sobre a origem e limites do conhecimento.
                </p>
                <p className="conteudo-texto">
                  - Filosofia Moderna: Análise do desenvolvimento do pensamento
                  filosófico entre os séculos XVII e XVIII.
                </p>
                <p className="conteudo-texto">
                  - Escola de Frankfurt: Estudo das ideias dos filósofos da
                  Escola de Frankfurt e suas críticas à sociedade contemporânea.
                </p>

                <h5 className="conteudo-titulo">SOCIOLOGIA</h5>
                <p className="conteudo-texto">
                  - Sociologia Contemporânea: Análise das principais correntes e
                  teorias sociológicas atuais e sua aplicação na compreensão da
                  sociedade.
                </p>
                <p className="conteudo-texto">
                  - Mundo do Trabalho: Estudo das transformações no mundo do
                  trabalho, incluindo relações de trabalho e novas formas de
                  emprego.
                </p>
                <p className="conteudo-texto">
                  - Cultura e Indústria Cultural: Reflexão sobre a produção
                  cultural em massa e suas influências na sociedade.
                </p>
                <p className="conteudo-texto">
                  - Ideologia: Compreensão dos sistemas de ideias que moldam a
                  percepção e as ações sociais.
                </p>
                <p className="conteudo-texto">
                  - Meios de Comunicação, Tecnologia e Cultura de Massa: Análise
                  do papel da mídia e da tecnologia na formação da cultura
                  contemporânea.
                </p>
                <p className="conteudo-texto">
                  - Cidadania: Estudo dos direitos e deveres dos cidadãos, e a
                  relação entre indivíduos e Estado.
                </p>
                <p className="conteudo-texto">
                  - Capitalismo: Análise do sistema econômico capitalista, suas
                  características, evolução e impacto social..
                </p>
                <p className="conteudo-texto">
                  - Economia e Sociedade: Reflexão sobre as interações entre os
                  sistemas econômicos e as estruturas sociais.
                </p>
              </AccordionItem>

              {/* --- Item 4: Ciências da Natureza --- */}
              <AccordionItem title="Ciências da Natureza e suas Tecnologias">
                <h5 className="conteudo-titulo">QUÍMICA</h5>
                <p className="conteudo-texto">
                  - Físico-Química: Estudo das propriedades físicas e
                  comportamentos das substâncias químicas, incluindo
                  termodinâmica e cinética.
                </p>
                <p className="conteudo-texto">
                  - Química Geral: Fundamentos da química, including conceitos
                  básicos, estrutura atômica, tabelas periódicas e leis
                  químicas.
                </p>
                <p className="conteudo-texto">
                  - Química Orgânica: Análise de compostos que contêm carbono,
                  incluindo sua estrutura, reatividade e aplicações.
                </p>
                <p className="conteudo-texto">
                  - Ligações Químicas, Polaridade e Forças: Estudo das
                  interações entre átomos e moléculas, incluindo ligações
                  covalentes, iônicas e a polaridade das moléculas.
                </p>
                <p className="conteudo-texto">
                  - Reações Orgânicas: Compreensão das principais reações que
                  envolvem compostos orgânicos, suas condições e mecanismos.
                </p>
                <p className="conteudo-texto">
                  - Compostos Orgânicos: Classificação e características dos
                  diferentes tipos de compostos orgânicos, como hidrocarbonetos,
                  álcoois e ácidos.
                </p>
                <p className="conteudo-texto">
                  - Eletroquímica: Estudo das relações entre eletricidade e
                  reações químicas, incluindo células galvânicas e eletrólise.
                </p>
                <p className="conteudo-texto">
                  - Estequiometria: Cálculos envolvendo a quantidade de
                  reagentes e produtos em reações químicas, baseados na Lei de
                  Conservação da Massa.
                </p>
                <p className="conteudo-texto">
                  - Soluções: Compreensão das propriedades e comportamentos das
                  soluções, incluindo concentração, solubilidade e pH.
                </p>
                <p className="conteudo-texto">
                  - Energia: Análise das transformações de energia em reações
                  químicas, incluindo energia de ativação e calor de reação.
                </p>

                <h5 className="conteudo-titulo">FÍSICA</h5>
                <p className="conteudo-texto">
                  - Mecânica: Estudo do movimento dos corpos, forças, leis de
                  Newton e aplicações em sistemas variados.
                </p>
                <p className="conteudo-texto">
                  - Eletricidade e Energia: Compreensão dos conceitos de
                  corrente elétrica, circuitos, resistência e potencial
                  elétrico.
                </p>
                <p className="conteudo-texto">
                  - Ondulatória: Análise das ondas, suas propriedades, tipos
                  (sonoras e eletromagnéticas) e fenômenos como interferência e
                  ressonância.
                </p>
                <p className="conteudo-texto">
                  - Termologia: Estudo das propriedades do calor e temperatura,
                  incluindo troca de calor e leis da termodinâmica.
                </p>
                <p className="conteudo-texto">
                  - Acústica: Compreensão das propriedades do som, propagação de
                  ondas sonoras e sua interação com os meios.
                </p>
                <p className="conteudo-texto">
                  - Energia, Trabalho e Potência: Análise das relações entre
                  trabalho, energia e potência em sistemas físicos.
                </p>
                <p className="conteudo-texto">
                  - Resistores: Estudo do funcionamento e aplicação de
                  resistores em circuitos elétricos, incluindo leis de Ohm.
                </p>
                <p className="conteudo-texto">
                  - Calorimetria: Medição de transferências de calor em reações
                  e processos físicos, com foco em capacidade calorífica e calor
                  específico.
                </p>
                <p className="conteudo-texto">
                  - Impulso, Quantidade de Movimento e Análise Dimensional:
                  Estudo do impulso como variação da quantidade de movimento e
                  aplicações em problemas de colisão.
                </p>
                <p className="conteudo-texto">
                  - Introdução à Óptica Geométrica: Compreensão dos princípios
                  da luz, formação de imagens por espelhos e lentes, e fenômenos
                  como reflexão e refração.
                </p>

                <h5 className="conteudo-titulo">BIOLOGIA</h5>
                <p className="conteudo-texto">
                  - Humanidade e Ambiente: Estudo das interações entre os seres
                  humanos e o meio ambiente, including impactos sociais,
                  culturais e ecológicos.
                </p>
                <p className="conteudo-texto">
                  - Citologia: Análise das células, suas estruturas, funções e
                  processos, como mitose e meiose.
                </p>
                <p className="conteudo-texto">
                  - Histologia e Fisiologia: Estudo dos tecidos do corpo humano
                  e suas funções, além dos sistemas que compõem o organismo.
                </p>
                <p className="conteudo-texto">
                  - Sistema Imunológico: Compreensão do funcionamento do sistema
                  de defesa do organismo, incluindo células imunológicas e
                  respostas imunes.
                </p>
                <p className="conteudo-texto">
                  - Ecossistemas: Análise das interações entre organismos e seu
                  ambiente, incluindo componentes bióticos e abióticos.
                </p>
                <p className="conteudo-texto">
                  - Fundamentos da Ecologia: Estudo das leis e princípios que
                  regem as interações ecológicas e a dinâmica das populações.
                </p>
                <p className="conteudo-texto">
                  - Biotecnologia: Compreensão das aplicações biológicas em
                  processos industriais, farmacêuticos e agrícolas, incluindo
                  manipulação genética.
                </p>
                <p className="conteudo-texto">
                  - DNA e RNA: Estudo da estrutura, função e processos de
                  replicação e transcrição do material genético.
                </p>
                <p className="conteudo-texto">
                  - Genética: Análise dos princípios da hereditariedade,
                  incluindo leis de Mendel, mutações e herança genética.
                </p>
              </AccordionItem>

              {/* --- Item 5: Professores Indicados --- */}
              <AccordionItem title="Professores Indicados">
                <div className="professores-container">
                  <h5 className="conteudo-titulo">Matemática</h5>
                  {/* Ferretto */}
                  <div className="professor-card">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ7-YDo7aI9PzmpPPyM_sAVJu1yx34JP-0LA&s"
                      alt="Professor Ferretto"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">
                        Professor Ferretto
                      </strong>
                      <a
                        href="https://www.youtube.com/@professorferretto"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        Somos a melhor comunidade de professores da internet,
                        com o melhor preço do Brasil e com a missão de fazer
                        você conquistar a sua aprovação no ENEM e Vestibulares
                        de todo o Brasil!
                      </p>
                    </div>
                  </div>
                  {/* Sandro Curió */}
                  <div className="professor-card">
                    <img
                      src="https://yt3.googleusercontent.com/ytc/AIdro_mRbvYBdE058O7f7q0sdVQpy6yrm9Od-7oM_2zeLLjEs7U=s900-c-k-c0x00ffffff-no-rj"
                      alt="Sandro Curió"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">
                        Dicasdemat Sandro Curió
                      </strong>
                      <a
                        href="https://www.youtube.com/@sandrocuriodicasdemat/featured"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        O canal DicasdeMat Sandro Curió tem como objetivo ajudar
                        estudantes, em todos os níveis da matemática. Através de
                        uma didática descontraída. Vamos juntos, RUMO AO TOPO!
                      </p>
                    </div>
                  </div>
                  {/* Gis com Giz */}
                  <div className="professor-card">
                    <img
                      src="https://yt3.googleusercontent.com/vXxFWAIMCsWqvtbVhKil1Qpu0SMoayFc_O_85o7eCgGQ91sJ9CGG356VIZVmZk2L5kJ6J-2MMA=s900-c-k-c0x00ffffff-no-rj"
                      alt="Gis com Giz"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">
                        Gis com Giz Mathematics
                      </strong>
                      <a
                        href="https://www.youtube.com/@Giscomgiz/featured"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        Oi!! Sou professor de Matemática e Mestre em Educação
                        Matemática. Criei o canal com o objetivo de mostrar que
                        é fácil aprender matemática e, por isso, procuro dar
                        explicações claras e objetivas. Bons estudos.
                      </p>
                    </div>
                  </div>

                  <h5 className="conteudo-titulo">Física</h5>
                  {/* Professor Coelho */}
                  <div className="professor-card">
                    <img
                      src="https://yt3.googleusercontent.com/qR1Vkuqb7Kef5GuxJM4fRLPKr1wUsMwRjkvqIP_JodHXkyvEayifIDr0jJvzpBHnjkM06p3JAg=s900-c-k-c0x00ffffff-no-rj"
                      alt="Professor Coelho"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">
                        Professor Coelho
                      </strong>
                      <a
                        href="https://www.youtube.com/@profcoelho"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        O canal de Física do Professor Coelho sintetiza o que
                        milhares de estudantes desejam: é a OPORTUNIDADE única
                        para adquirir um elevado CONHECIMENTO em física, desde o
                        nível básico até o avançado. Venha estudar conosco!
                      </p>
                    </div>
                  </div>
                  {/* Professor Boaro */}
                  <div className="professor-card">
                    <img
                      src="https://principal.professorboaro.com.br/wp-content/uploads/2022/04/blob-2-1-copia.png"
                      alt="Professor Boaro"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">
                        Professor Boaro
                      </strong>
                      <a
                        href="https://www.youtube.com/@professorboaro/featured"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        Fala Galera! Neste Canal postarei vídeos com dicas para
                        os vestibulares, resolução das provas mais recentes,
                        além das aulas divididas em pequenos módulos para
                        facilitar seu aprendizado. Aproveite!
                      </p>
                    </div>
                  </div>
                  {/* FisicaInterativa.Com */}
                  <div className="professor-card">
                    <img
                      src="https://yt3.googleusercontent.com/ytc/AIdro_lXotlN-Ff9WiHVQ_abXiVaMTDXpvRo6ZM9dEg8tFHwEjQ=s900-c-k-c0x00ffffff-no-rj"
                      alt="FisicaInterativa"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">
                        FisicaInterativa.Com
                      </strong>
                      <a
                        href="https://www.youtube.com/@fisicainterativa"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        Aulas de física ao vivo pelo Youtube para o ENEM e
                        Vestibular. Sem complicação, basta se inscrever no
                        canal, conectar e assistir
                      </p>
                    </div>
                  </div>

                  <h5 className="conteudo-titulo">Química</h5>
                  {/* Prof Michel */}
                  <div className="professor-card">
                    <img
                      src="https://yt3.googleusercontent.com/_idDYvyBk1aJWDz9b24m2GedRq8VCJKAjwcEhp4HQfzCVhb8ECv3B5uI9ravtPjRWMk2TQrY4A=s900-c-k-c0x00ffffff-no-rj"
                      alt="Prof Michel"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">
                        Café com química - Prof Michel
                      </strong>
                      <a
                        href="https://www.youtube.com/@profmichel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        O canal café com química surgiu para oferecer uma
                        solução criativa no estudo de química!!! Através de
                        aulas curtas, experiências e exercícios temos o enorme
                        prazer de contribuir para a democratização do ensino no
                        Brasil.
                      </p>
                    </div>
                  </div>
                  {/* Professor Gabriel Cabral */}
                  <div className="professor-card">
                    <img
                      src="https://yt3.googleusercontent.com/ZoQxft3cKV86LKaM9vCaU_2-N3vaWn5h3fE8qxpq-XGGDqje19H_-bE_XLY2amAg2c9pAnBQ=s900-c-k-c0x00ffffff-no-rj"
                      alt="Gabriel Cabral"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">
                        Professor Gabriel Cabral
                      </strong>
                      <a
                        href="https://www.youtube.com/@ProfessorGabrielCabral"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        Canal voltado para o ensino da Química de maneira rápida
                        e divertida.
                      </p>
                    </div>
                  </div>
                  {/* Prof. Silvio Predis */}
                  <div className="professor-card">
                    <img
                      src="https://yt3.googleusercontent.com/ytc/AIdro_m2Fd3czKi-1l16CCKqxFOHV29pywOe071s28WqiHRgKJQ=s900-c-k-c0x00ffffff-no-rj"
                      alt="Silvio Predis"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">
                        Prof. Silvio Predis - Química Nota 10
                      </strong>
                      <a
                        href="https://www.youtube.com/@ProfSilvioPredis"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        Se você tem o hábito de navegar pelas redes sociais, é
                        bastante provável que já tenha ouvido falar no professor
                        Silvio Predis...
                      </p>
                    </div>
                  </div>

                  {/* --- SEÇÃO DE LITERATURA E PORTUGUÊS (ATUALIZADA) --- */}
                  <h5 className="conteudo-titulo">Português e Literatura</h5>
                  <div className="professor-card">
                    <img
                      src="https://yt3.googleusercontent.com/ZqJbRW5vQRVFVVc0JyQu7MJq9v4h0vJAcBKmXvXouNhyFvt0Fmg8E5l-LhDgWalLVXvgieU5=s160-c-k-c0x00ffffff-no-rj"
                      alt="Alencar"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">
                        Literatura com Alencar
                      </strong>
                      <a
                        href="https://www.youtube.com/@LiteraturacomAlencar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        Olá, meu nome é Alencar Schueroff. Com minhas videoaulas
                        de Literatura, ajudo você em provas, mostrando e
                        ensinando o que mais cai em Literatura no Enem, em
                        vestibulares e concursos.
                      </p>
                    </div>
                  </div>
                  <div className="professor-card">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyjj6iBC2OLUxSw_z0YS-Yj1pVR9EwuRQYRA&s"
                      alt="Pam Gonçalves"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">PAM GONÇALVES</strong>
                      <a
                        href="https://www.youtube.com/@apamgoncalves"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        Desde 2009 falando de livros na internet | resenhas de
                        livros, listas e discussões.
                      </p>
                    </div>
                  </div>
                  <div className="professor-card">
                    <img
                      src="https://cdn.folhape.com.br/upload/dn_arquivo/2018/10/tati1.jpg"
                      alt="Tatiana Feltrin"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">
                        tatianagfeltrin
                      </strong>
                      <a
                        href="https://www.youtube.com/@tatifeltrin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        TLT - Ligando livros às pessoas
                      </p>
                    </div>
                  </div>
                  <div className="professor-card">
                    <img
                      src="https://yt3.googleusercontent.com/12a76Za8ElTlzhyGF2TIYQT99F9XXMe0FVdOaq6-D9-iBiVAgb73XhQVWiiOP1_fcnb-7zmf0A=s900-c-k-c0x00ffffff-no-rj"
                      alt="Prof Noslen"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">
                        Professor Noslen
                      </strong>
                      <a
                        href="https://www.youtube.com/@ProfessorNoslen"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        O maior canal de ensino de Língua Portuguesa do mundo!
                        Aulas, dicas e muito mais para você aprender de forma
                        divertida.
                      </p>
                    </div>
                  </div>

                  {/* --- SEÇÃO DE BIOLOGIA (NOVA) --- */}
                  <h5 className="conteudo-titulo">Biologia</h5>
                  <div className="professor-card">
                    <img
                      src="https://yt3.googleusercontent.com/eQcYYFT1d-6UipipmUbTv5XqPMpDZwFVZFhjfIcr3JW9hTQz4ml75bwKxDSwcW-UbAMH-Gf51w=s900-c-k-c0x00ffffff-no-rj"
                      alt="Samuel Cunha"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">
                        Biologia com Samuel Cunha
                      </strong>
                      <a
                        href="https://www.youtube.com/@BiologiacomSamuelCunha"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        Canal voltado para o ensino de Biologia de forma clara e
                        objetiva, focado em vestibulares e ENEM.
                      </p>
                    </div>
                  </div>
                  <div className="professor-card">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoTUWvUcq_z82kIsOUn7QKLCby7V4-m2uLgg&s"
                      alt="Prof Jubilut"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">
                        Biologia Total com Prof. Jubilut
                      </strong>
                      <a
                        href="https://www.youtube.com/@BiologiaTotal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        Aprenda Biologia de um jeito fácil e divertido! O Prof.
                        Jubilut te ajuda a se preparar para o ENEM e
                        vestibulares.
                      </p>
                    </div>
                  </div>
                  <div className="professor-card">
                    <img
                      src="https://yt3.googleusercontent.com/FsW4dOahfAfBRYgLaJa8oufD6YR9UBGqxFojg_pp8LE0ArhSLYRr_V7gXEzkXRk26fnR2O4q-kA=s900-c-k-c0x00ffffff-no-rj"
                      alt="Prof Kennedy"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">
                        BioExplica (Prof. Kennedy)
                      </strong>
                      <a
                        href="https://www.youtube.com/@bioexplica"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        O BioExplica é o seu canal de Biologia para o ENEM e
                        Vestibulares, com o professor Kennedy Ramos.
                      </p>
                    </div>
                  </div>

                  {/* --- SEÇÃO DE GEOGRAFIA (NOVA) --- */}
                  <h5 className="conteudo-titulo">Geografia</h5>
                  <div className="professor-card">
                    <img
                      src="https://yt3.googleusercontent.com/vaG4oDxWflCeQeAwjF6ELiFxhbATiPS732zbhEydKrgxdl3ff6Td-vR0qX0fEOMBeE2--6dXGg=s900-c-k-c0x00ffffff-no-rj"
                      alt="Geografia Irada"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">
                        Geografia Irada com Prof. Jean
                      </strong>
                      <a
                        href="https://www.youtube.com/@GeografiaIrada"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        Aulas de Geografia para ENEM, Vestibulares e Concursos.
                        Aprenda Geografia de um jeito que você nunca viu!
                      </p>
                    </div>
                  </div>
                  <div className="professor-card">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEKwJXXXN6G8vTOszkGe-p1_L2XBS3LwS4Jg&s"
                      alt="Terra Negra"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">
                        Terra Negra (Prof. Vitor)
                      </strong>
                      <a
                        href="https://www.youtube.com/@TerraNegra"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        Canal de Geografia, Atualidades e Geopolítica focado no
                        ENEM e Vestibulares.
                      </p>
                    </div>
                  </div>

                  {/* --- SEÇÃO DE HISTÓRIA (NOVA) --- */}
                  <h5 className="conteudo-titulo">História</h5>
                  <div className="professor-card">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJP1pg6ZpvPxj4el-zh_B1vGIdx5F8rHdEpg&s"
                      alt="Se Liga"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">
                        Se Liga Nessa História
                      </strong>
                      <a
                        href="https://www.youtube.com/@SeLigaNessaHistoria"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        Aprenda História de um jeito diferente, divertido e com
                        muito conteúdo. Foco total no ENEM e Vestibulares.
                      </p>
                    </div>
                  </div>
                  <div className="professor-card">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNlJK9KxBhtZv_qjiAXUg8qGobivQaRRqKsQ&s"
                      alt="Prof Walter"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">
                        Canal do Prof. Walter
                      </strong>
                      <a
                        href="https://www.youtube.com/@CanaldoProfWalter"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        Aulas de História Geral, do Brasil, Sociologia e
                        Filosofia para vestibulares.
                      </p>
                    </div>
                  </div>

                  {/* --- SEÇÃO DE FILOSOFIA E SOCIOLOGIA (NOVA) --- */}
                  <h5 className="conteudo-titulo">Filosofia e Sociologia</h5>
                  <div className="professor-card">
                    <img
                      src="https://yt3.googleusercontent.com/IaDOZZg1C4eq-cK4L5HzClzEVQgqX8z9GnIMH_QmWTiZ8YggNKshLvzcQFIcVYnYmIim1GSBhA=s900-c-k-c0x00ffffff-no-rj"
                      alt="Filo/Socio"
                      className="professor-perfil"
                    />
                    <div className="professor-info">
                      <strong className="professor-nome">
                        A Filosofia Explica
                      </strong>
                      <a
                        href="https://www.youtube.com/@afilosofiaexplica"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="professor-link">
                        <FaYoutube /> Canal Youtube
                      </a>
                      <p className="professor-bio">
                        Canal dedicado a descomplicar a Filosofia e a Sociologia
                        para as provas do ENEM e vestibulares.
                      </p>
                    </div>
                  </div>

                  {/* Adicione Biologia aqui se necessário */}
                </div>
              </AccordionItem>
            </div>
          </div>
        </div>
      )}

      {/* --- Footer --- */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section footer-about">
            <h4>Sobre o Preparavest</h4>
            <p>
              Nossa missão é democratizar o acesso à educação de qualidade,
              oferecendo as melhores ferramentas e conteúdos para preparação de
              vestibulares em todo o Brasil.
            </p>
          </div>

          <div className="footer-section footer-devs">
            <h4>Desenvolvedores</h4>
            <ul className="dev-list">
              <li>
                <a
                  href="https://www.linkedin.com/in/muryllo-da-silva-teixeira-2361592b3/"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaLinkedin /> Muryllo da S. Teixeira
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/matheus-gobeti-marques-12b18537a/"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaLinkedin /> Matheus G. Marques
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/paulo-afonso-baptista-dos-santos-90a4662a0/"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaLinkedin /> Paulo Afonso B. dos Santos
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/hanry-sucena-nunes-56436a362/"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaLinkedin /> Hanry S. Nunes
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/pedro-souza-dey-695a622bb/"
                  target="_blank"
                  rel="noopener noreferrer">
                  <FaLinkedin /> Pedro de S. Dey
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-copyright">
          <p>
            &copy; {new Date().getFullYear()} Preparavest. Todos os direitos
            reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
