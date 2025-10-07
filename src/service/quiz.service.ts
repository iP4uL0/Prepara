import { api } from '../utils/axios';
import type { Question } from '../types';

export const quizService = {
  getQuestions: async (): Promise<Question[]> => {
    const response = await api.get('/perguntas');
    return response.data;
  },

  createQuestion: async (question: Omit<Question, 'id_quest'>): Promise<Question> => {
    const response = await api.post('/perguntas', question);
    return response.data;
  },

  updateQuestion: async (id: number, question: Partial<Question>): Promise<Question> => {
    const response = await api.put(`/perguntas/${id}`, question);
    return response.data;
  },

  deleteQuestion: async (id: number): Promise<void> => {
    await api.delete(`/perguntas/${id}`);
  },
};