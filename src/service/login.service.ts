import { api } from '../utils/axios';
import type { LoginData, RegisterData, User } from '../types';

export const loginService = {
  login: async (data: LoginData): Promise<User> => {
    const response = await api.post('/login', data);
    return response.data;
  },
};

export const cadastroService = {
  register: async (data: RegisterData): Promise<any> => {
    const response = await api.post('/usuarios', data);
    return response.data;
  },
};