import api from './api.js';

export const loginRequest = async ({ email, password }) => {
  const { data } = await api.post('/auth/login', { email, password });
  localStorage.setItem('spellman_token', data.token);
  return data;
};

export const logoutRequest = async () => api.post('/auth/logout');

export const getCurrentUser = async () => {
  const { data } = await api.get('/auth/me');
  return data.user;
};
