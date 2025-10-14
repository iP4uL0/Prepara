import axios, { AxiosError } from 'axios';

// Configuração centralizada do Axios para consumir a API
// Conforme solicitado: baseURL fixa para o IP local, timeout e headers padrão
export const api = axios.create({
  baseURL: 'http://192.168.1.57:3000',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

// Exporta o tipo AxiosError para uso em tratamento de erros
export type { AxiosError };