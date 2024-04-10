import { useEffect } from "react";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Loader from "../components/Loader/Loader";
import ProductList from "../components/ProductList/ProductList";
import SearchForm from "../components/SearchForm/SearchForm";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  apiGetProductsByQuery,
  selectProducts,
  selectProductsIsError,
  selectProductsIsLoading,
} from "../redux/productsReducer";
import { Helmet } from "react-helmet-async";

const SearchPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectProductsIsLoading);
  const isError = useSelector(selectProductsIsError);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");

  useEffect(() => {
    if (searchQuery === null) return;

    dispatch(apiGetProductsByQuery(searchQuery));
  }, [searchQuery, dispatch]);

  const onSetSearchQuery = (searchTerm) => {
    // setSearchQuery(query);
    if (searchTerm.trim().length === 0) {
      alert("Please enter a search term first!");
      return;
    }
    setSearchParams({ query: searchTerm });
  };

  return (
    <div>
      <Helmet>
        <title>Search your product</title>
      </Helmet>
      <h1>Find your product</h1>
      <SearchForm
        searchQuery={searchQuery}
        onSetSearchQuery={onSetSearchQuery}
      />

      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      <ProductList products={products} />
    </div>
  );
};

export default SearchPage;
