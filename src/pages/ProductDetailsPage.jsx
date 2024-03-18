import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { requestProductsById } from "../services/api";
import { ErrorMessage } from "formik";
import Loader from "../components/Loader/Loader";
import ProductComments from "../components/ProductComments/ProductComments";

const ProductDetailsPage = () => {
  const { productId } = useParams(); // Get the product ID from the URL parameter.
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await requestProductsById(productId);

        setProductData(data);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [productId]);

  return (
    <div>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {productData !== null && (
        <div>
          <h1>{productData.title}</h1>
          <p>{productData.description}</p>
          <p>Price: ${productData.price}</p>
          <p>Brand: {productData.brand}</p>
          <p>Rating: {productData.rating}</p>

          <ul>
            {productData.images.map((imageSrc) => (
              <li key={imageSrc}>
                <img width={150} src={imageSrc} alt={productData.title} />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <Link to="comments">Comments</Link>
      </div>
      <Routes>
        <Route path="comments" element={<ProductComments />} />
      </Routes>
    </div>
  );
};

export default ProductDetailsPage;
