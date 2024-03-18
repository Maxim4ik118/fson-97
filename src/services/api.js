import axios from "axios";

export const requestProducts = async () => {
  const { data } = await axios.get("https://dummyjson.com/products");
  return data;
};

export const requestProductsByQuery = async (query) => {
  const { data } = await axios.get(
    `https://dummyjson.com/products/search?q=${query}`
  );
  return data;
};

export const requestProductsById = async (productId) => {
  const { data } = await axios.get(
    `https://dummyjson.com/products/${productId}`
  );
  return data;
};
