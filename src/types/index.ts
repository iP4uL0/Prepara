export interface User {
  id_user: number;
  nome: string;
  email: string;
  tipo: string;
}

export interface Question {
  id_quest: number;
  enunciado: string;
  alt_a: string;
  alt_b: string;
  alt_c: string;
  alt_d: string;
  alt_e: string;
  correta: string;
  imagem?: string;
}

export interface UserAnswer {
  id_quest: number;
  resposta: string;
}

export interface RankingUser {
  nome: string;
  total_acertos: number;
}

export interface LoginData {
  email: string;
  senha: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  senha: string;
  senhaConfirmacao: string;
}

export interface QuizResult {
  acertos: number;
  total: number;
  pontuacao: number;
}