import api from './api.js';

export const uploadMedia = async (file, folder = 'spellman', type = 'image') => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);
  const endpoint = type === 'video' ? '/upload/video' : '/upload/image';
  const { data } = await api.post(endpoint, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};
