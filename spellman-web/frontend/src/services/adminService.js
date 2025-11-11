import api from './api.js';

export const fetchOverview = async () => {
  const { data } = await api.get('/admin/overview');
  return data.data;
};

export const fetchAnalytics = async () => {
  const { data } = await api.get('/admin/analytics');
  return data.data;
};

export const fetchUsers = async () => {
  const { data } = await api.get('/admin/users');
  return data.data;
};

export const fetchLogs = async () => {
  const { data } = await api.get('/admin/logs');
  return data.data;
};

export const fetchDomains = async () => {
  const { data } = await api.get('/admin/domains');
  return data.data;
};

export const createDomain = async (payload) => {
  const { data } = await api.post('/admin/domains', payload);
  return data.data;
};

export const updateDomain = async (id, payload) => {
  const { data } = await api.put(`/admin/domains/${id}`, payload);
  return data.data;
};

export const deleteDomain = async (id) => api.delete(`/admin/domains/${id}`);

export const fetchSecurity = async () => {
  const { data } = await api.get('/admin/security');
  return data.data;
};

export const updateSecurity = async (payload) => {
  const { data } = await api.put('/admin/security', payload);
  return data.data;
};

export const fetchSettings = async () => {
  const { data } = await api.get('/admin/settings');
  return data.data;
};

export const updateSettings = async (payload) => {
  const { data } = await api.put('/admin/settings', payload);
  return data.data;
};
