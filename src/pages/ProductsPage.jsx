import { useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Loader from "../components/Loader/Loader";
import ProductList from "../components/ProductList/ProductList";
import { requestProducts } from "../services/api";

const ProductsPage = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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


  return (
    <div>
      <h1>Phone Store</h1>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      <ProductList products={products} />
    </div>
  );
};

export default ProductsPage;