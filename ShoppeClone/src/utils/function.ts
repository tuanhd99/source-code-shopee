// Save value to localStorage
export const saveToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Get value form localStorage

export const getFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

// Remove value form localStorage
export const removeKeyLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
