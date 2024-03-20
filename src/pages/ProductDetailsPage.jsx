import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import { requestProductsById } from "../services/api";
import { ErrorMessage } from "formik";
import Loader from "../components/Loader/Loader";
// import ProductComments from "../components/ProductComments/ProductComments";
const ProductComments = lazy(() =>
  import("../components/ProductComments/ProductComments")
);

const ProductDetailsPage = () => {
  const { productId } = useParams(); // Get the product ID from the URL parameter.
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/search");

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
          <Link to={backLinkRef.current}>Go back</Link>
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
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="comments" element={<ProductComments />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default ProductDetailsPage;
