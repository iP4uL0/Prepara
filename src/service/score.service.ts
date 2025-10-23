import { api } from '../utils/axios';
import type { RankingUser } from '../types';

export const scoreService = {
  getRanking: async (): Promise<RankingUser[]> => {
    const response = await api.get('/acertos');
    return response.data;
  },

// 🆕 Nova função pra enviar respostas completas
  async submitAnswers(id_user: number, respostas: any[]) {
    return api.post("/perguntas/correcao", { id_user, respostas });
  },
};  