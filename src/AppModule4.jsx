import { useEffect, useState } from "react";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Loader from "./components/Loader/Loader";
import ProductList from "./components/ProductList/ProductList";
import { requestProducts, requestProductsByQuery } from "./services/api";
import SearchForm from "./components/SearchForm/SearchForm";

const AppModule4 = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await requestProducts();

        setProducts(data.products);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (searchQuery === null) return;

    async function fetchDataByQuery() {
      try {
        setIsLoading(true);
        const data = await requestProductsByQuery(searchQuery);

        setProducts(data.products);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDataByQuery();
  }, [searchQuery]);

  const onSetSearchQuery = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <h1>Phone Store</h1>
      <SearchForm onSetSearchQuery={onSetSearchQuery} />

      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      <ProductList products={products} />
    </div>
  );
};

export default AppModule4;
