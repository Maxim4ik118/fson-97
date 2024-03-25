import { Suspense, lazy, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import { requestProductsById } from "../services/api";
import { ErrorMessage } from "formik";
import Loader from "../components/Loader/Loader";
// import ProductComments from "../components/ProductComments/ProductComments";
const ProductComments = lazy(() =>
  import("../components/ProductComments/ProductComments")
);

/*
Алгоритм роботи з Редакс:
1. Встановлення.
2. Налаштовуємо стор -> в src створити папку redux/store.js
3. Підключимо інструменти розробника reduxDevtools
4. Підключити стор до App.jsx
5. Підготувати прототип функції редьюсер та продумати початковий стан.
6. Підключити редьюсер до combineReducers.
7. Витягнути дані в компоненті зі стору за допомогою useSelector.
8. Описати логіку редьюсеру.
9. Постворювати actions -> об`єкти інструкцій ({
          type: "details/setIsLoading",
          payload: true,
    })
10.Отримати dispatch за допомогою хука useDispatch і задіспатчити action -> dispatch(action)

Store -> це глобальне сховище даних. Наше джерело істини.

Reducer -> це чиста функція, яка приймає два аргумети state 
           та action та повертає змінений, або незмінений стейт.(Дані в середині 
           функцію змінюються іммутабельно).

Action -> це об'єкт, в якого обов'язково має бути поле type, також може
           бути поле payload -> { type: "some/typename", payload?: someData }

Quick Console log -> CTRL/CMD + SHIFT + L
*/

const ProductDetailsPage = () => {
  const { productId } = useParams(); // Get the product ID from the URL parameter.

  const dispatch = useDispatch();
  const productData = useSelector((state) => state.productDetails.productData);
  const isLoading = useSelector((state) => state.productDetails.isLoading);
  const isError = useSelector((state) => state.productDetails.isError);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/search");

  useEffect(() => {
    async function fetchData() {
      try {
        const loadingEnableAction = {
          type: "details/setIsLoading",
          payload: true,
        };
        dispatch(loadingEnableAction);
        const data = await requestProductsById(productId);

        const setProductDataAction = {
          type: "details/setProductData",
          payload: data,
        };
        dispatch(setProductDataAction);
      } catch (err) {
        const setErrorAction = {
          type: "details/setIsError",
          payload: true,
        };
        dispatch(setErrorAction);
      } finally {
        const loadingDisableAction = {
          type: "details/setIsLoading",
          payload: false,
        };
        dispatch(loadingDisableAction);
      }
    }

    fetchData();
  }, [productId, dispatch]);

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
