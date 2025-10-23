import { api } from '../utils/axios';
import type { LoginData, RegisterData, User } from '../types';

export const loginService = {
  login: async (data: LoginData): Promise<User> => {
    const response = await api.post('/login', data);
    const raw = response.data as any;

    // Normaliza a função do usuário: '2' para admin, '1' para usuário normal
    const rawFuncao = raw?.funcao ?? raw?.tipo;
    const funcao =
      rawFuncao === 'admin' || rawFuncao === 2 || rawFuncao === '2' ? '2' : '1';

    const user: User = {
      id_user: Number(raw?.id_user ?? raw?.id ?? raw?.user_id),
      email: String(raw?.email ?? ''),
      nome: String(raw?.nome ?? raw?.name ?? ''),
      funcao,
    };
    return user;
  },
};

export const cadastroService = {
  register: async (data: RegisterData): Promise<any> => {
    const response = await api.post('/usuario', data);
    return response.data;
  },
};