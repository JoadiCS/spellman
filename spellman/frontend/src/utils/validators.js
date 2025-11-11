export const isEmail = (value = '') => /\S+@\S+\.\S+/.test(value);

export const required = (value) => {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return true;
};
