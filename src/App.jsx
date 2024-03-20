import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// import WelcomePage from "./pages/WelcomePage";
// import HomePage from "./pages/HomePage";
// import ProductsPage from "./pages/ProductsPage";
// import ProductDetailsPage from "./pages/ProductDetailsPage";

const WelcomePage = lazy(() => import("./pages/WelcomePage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));

import SearchPage from "./pages/SearchPage";
import Loader from "./components/Loader/Loader";
import Layout from "./components/Layout/Layout";

/*
Робота з маршрутизацією:
  1. Продумати маршрути та навчитися їх змінювати 
      за допомогою компоненти NavLink|Link.
  2. Підготувати шаблон сторінки і рендерити його 
      за умовою співпадіння з вказаним паттерном маршруту (Route)

*/

function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
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
