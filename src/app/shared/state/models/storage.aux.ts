export const setItem = <T>(key: string, value: T) =>
  localStorage.setItem(key, JSON.stringify(value));

export const getItem = <T>(key: string): T | undefined => {
  const value = localStorage.getItem(key);
  if (!value) {
    return undefined;
  }
  return JSON.parse(value);
};
