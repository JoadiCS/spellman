export const formatHookWords = (hookWords = '') =>
  hookWords
    .split(',')
    .map((word) => word.trim())
    .filter(Boolean);

export const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export const classNames = (...classes) => classes.filter(Boolean).join(' ');
