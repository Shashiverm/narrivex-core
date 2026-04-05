import axios, { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (typeof window !== 'undefined' && error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const api = {
  getNarrative: (symbol: string) => apiClient.get(`/narratives/${symbol}`),
  getNarrativeHistory: (symbol: string, limit = 20, offset = 0) =>
    apiClient.get(`/narratives/${symbol}/history?limit=${limit}&offset=${offset}`),
  regenerateNarrative: (symbol: string) => apiClient.post(`/narratives/${symbol}/regenerate`),

  getAssets: () => apiClient.get('/assets'),
  addAsset: (symbol: string) => apiClient.post('/assets', { symbol }),
  removeAsset: (symbol: string) => apiClient.delete(`/assets/${symbol}`),

  getAlertRules: () => apiClient.get('/alerts/rules'),
  createAlertRule: (rule: unknown) => apiClient.post('/alerts/rules', rule),
  updateAlertRule: (id: string, rule: unknown) => apiClient.put(`/alerts/rules/${id}`, rule),
  deleteAlertRule: (id: string) => apiClient.delete(`/alerts/rules/${id}`),
};