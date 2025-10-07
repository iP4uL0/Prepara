import { api } from '../utils/axios';
import type { RankingUser } from '../types';

export const scoreService = {
  getRanking: async (): Promise<RankingUser[]> => {
    const response = await api.get('/acertos');
    return response.data;
  },

  submitScore: async (userId: number, acertos: number): Promise<any> => {
    const response = await api.post('/acertos', {
      id_user: userId,
      acertos: acertos,
    });
    return response.data;
  },
};