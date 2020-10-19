/*
  如果需要存Object或是Array型態才使用setJsonLocalStorage()和getJsonLocalStorage()
  否則直接使用localStorage的API
*/
export const setJsonLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getJsonLocalStorage = (key) => {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
  return null;
};
