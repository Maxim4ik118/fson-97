import { Suspense, lazy, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Route, Routes, useLocation, useParams } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import {
  apiGetProductDetails,
  selectProductData,
  selectProductDetailsIsError,
  selectProductDetailsIsLoading,
} from "../redux/productDetailReducer";
import ReduxCounter from "../components/ReduxCounter/ReduxCounter";
import ProductInfo from "../components/ProductInfo/ProductInfo";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { Helmet } from "react-helmet-async";
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

Action Creator -> це функція, яка може приймати поле payload і завжди повертає
                  об'єкт action'a.

Thunk -> Асинхронний генератор екшенів -> Асинхронна операція -> Редакс Cанка
Quick Console log -> CTRL/CMD + SHIFT + L
*/

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const { productId } = useParams(); // Get the product ID from the URL parameter.

  const productData = useSelector(selectProductData);
  const isLoading = useSelector(selectProductDetailsIsLoading);
  const isError = useSelector(selectProductDetailsIsError);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/search");

  useEffect(() => {
    dispatch(apiGetProductDetails(productId));
  }, [productId, dispatch]);

  return (
    <div>
      <Helmet>
        <title>Product Details</title>
      </Helmet>
      <ReduxCounter />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      {productData !== null && (
        <ProductInfo refValue={backLinkRef.current} productData={productData} />
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
