export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const setSessionStorage = (key, value) => {
  sessionStorage.setItem(key, value);
}

export const getSessionStorage = (key) => {
  return sessionStorage.getItem(key);
};