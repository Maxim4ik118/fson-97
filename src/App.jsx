import { NavLink, Route, Routes } from "react-router-dom";
import clsx from "classnames";

import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";

import css from "./App.module.css";
import ProductDetailsPage from "./pages/ProductDetailsPage";

/*
Робота з маршрутизацією:

  1. Продумати маршрути та навчитися їх змінювати 
      за допомогою компоненти NavLink|Link.
  2. Підготувати шаблон сторінки і рендерити його 
      за умовою співпадіння з вказаним паттерном маршруту (Route)


*/

const getNavLinkClassNames = ({ isActive }) =>
  clsx(css.headerLink, {
    [css.active]: isActive,
  });

function App() {
  return (
    <div>
      <header className={css.header}>
        <NavLink className={getNavLinkClassNames} to="/">
          Welcome
        </NavLink>
        <NavLink className={getNavLinkClassNames} to="/home">
          Home
        </NavLink>
        <NavLink className={getNavLinkClassNames} to="/products" end>
          Products
        </NavLink>
      </header>

      <main>
        <Routes>
          {/* http://localhost:5173/products/1 */}
          {/* http://localhost:5173/products/2 */}
          {/* http://localhost:5173/products/3 */}
          {/* http://localhost:5173/products/4 */}
          {/* http://localhost:5173/products/3/comments */}
          {/* http://localhost:5173/products/4/comments */}
          {/* http://localhost:5173/products/4/comments */}

          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId/*" element={<ProductDetailsPage />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;
