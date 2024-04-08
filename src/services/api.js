import axios from "axios";
/*
Основні складові мережевого запиту:
  1. Хост/Базовий ЮРЛ/Адреса/Повний шлях.
  2. Метод запиту (GET, POST, PUT, PATCH, DELETE).
  3. Хедери запиту.
  4. Параметри запиту -> ?ключ1=значення1&ключ2=значення2.
  5. Тіло запиту. (у всіх методах крім гет)
  6. Кукі файли.
*/
export const requestProducts = async () => {
  const { data } = await axios.get("https://dummyjson.com/products");
  return data;
};

export const requestProductsByQuery = async (query) => {
  const { data } = await axios.get(`https://dummyjson.com/products/search`, {
    params: {
      q: query,
    },
  });
  return data;
};

export const requestProductsById = async (productId) => {
  const { data } = await axios.get(
    `https://dummyjson.com/products/${productId}`
  );
  return data;
};
