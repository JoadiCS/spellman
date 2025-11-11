import api from './api.js';

export const fetchAllContent = async () => {
  const { data } = await api.get('/content');
  return data.data;
};

export const fetchSectionContent = async (section) => {
  const { data } = await api.get(`/content/${section}`);
  return data.data;
};

export const createContentItem = async (payload) => {
  const { data } = await api.post('/content', payload);
  return data.data;
};

export const updateContentItem = async (id, payload) => {
  const { data } = await api.put(`/content/${id}`, payload);
  return data.data;
};

export const deleteContentItem = async (id) => api.delete(`/content/${id}`);
