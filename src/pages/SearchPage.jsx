import { useEffect } from "react";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Loader from "../components/Loader/Loader";
import ProductList from "../components/ProductList/ProductList";
import SearchForm from "../components/SearchForm/SearchForm";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { apiGetProductsByQuery } from "../redux/productsReducer";

const SearchPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productsData.products);
  const isLoading = useSelector((state) => state.productsData.isLoading);
  const isError = useSelector((state) => state.productsData.isError);

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
