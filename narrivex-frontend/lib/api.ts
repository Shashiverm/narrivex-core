import axios, { AxiosError } from 'axios';
import { getSession } from 'next-auth/react';
import { trackEvent } from '@/lib/analytics';

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

const getErrorStatus = (error: unknown): number | null => {
  if (axios.isAxiosError(error)) {
    return error.response?.status ?? null;
  }
  return null;
};

export const api = {
  getNarrative: (symbol: string) => apiClient.get(`/narratives/${symbol}`),
  getNarrativeHistory: (symbol: string, limit = 20, offset = 0) =>
    apiClient.get(`/narratives/${symbol}/history?limit=${limit}&offset=${offset}`),
  regenerateNarrative: (symbol: string) => apiClient.post(`/narratives/${symbol}/regenerate`),

  getAssets: () => apiClient.get('/assets'),
  addAsset: async (symbol: string) => {
    trackEvent('asset_add_attempt', { symbol });
    try {
      const response = await apiClient.post('/assets', { symbol });
      trackEvent('asset_add_success', { symbol });
      return response;
    } catch (error) {
      trackEvent('asset_add_failed', { symbol, status: getErrorStatus(error) });
      throw error;
    }
  },
  removeAsset: async (symbol: string) => {
    trackEvent('asset_remove_attempt', { symbol });
    try {
      const response = await apiClient.delete(`/assets/${symbol}`);
      trackEvent('asset_remove_success', { symbol });
      return response;
    } catch (error) {
      trackEvent('asset_remove_failed', { symbol, status: getErrorStatus(error) });
      throw error;
    }
  },

  getAlertRules: () => apiClient.get('/alerts/rules'),
  createAlertRule: async (rule: unknown) => {
    trackEvent('alert_rule_create_attempt');
    try {
      const response = await apiClient.post('/alerts/rules', rule);
      trackEvent('alert_rule_create_success');
      return response;
    } catch (error) {
      trackEvent('alert_rule_create_failed', { status: getErrorStatus(error) });
      throw error;
    }
  },
  updateAlertRule: (id: string, rule: unknown) => apiClient.put(`/alerts/rules/${id}`, rule),
  deleteAlertRule: async (id: string) => {
    trackEvent('alert_rule_delete_attempt');
    try {
      const response = await apiClient.delete(`/alerts/rules/${id}`);
      trackEvent('alert_rule_delete_success');
      return response;
    } catch (error) {
      trackEvent('alert_rule_delete_failed', { status: getErrorStatus(error) });
      throw error;
    }
  },
};