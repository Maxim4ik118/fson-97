import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux'
// import WelcomePage from "./pages/WelcomePage";
// import HomePage from "./pages/HomePage";
// import ProductsPage from "./pages/ProductsPage";
// import ProductDetailsPage from "./pages/ProductDetailsPage";

const WelcomePage = lazy(() => import("./pages/WelcomePage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));

import SearchPage from "./pages/SearchPage";
import Loader from "./components/Loader/Loader";
import Layout from "./components/Layout/Layout";
import { apiRefreshUser } from "./redux/authReducer";

/*
Робота з маршрутизацією:
  1. Продумати маршрути та навчитися їх змінювати 
      за допомогою компоненти NavLink|Link.
  2. Підготувати шаблон сторінки і рендерити його 
      за умовою співпадіння з вказаним паттерном маршруту (Route)

*/

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(apiRefreshUser())
  }, [dispatch])

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route
            path="/products/:productId/*"
            element={<ProductDetailsPage />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
