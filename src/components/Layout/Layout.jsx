import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import clsx from "classnames";

import css from "../../App.module.css";
import { selectUserData, selectUserIsSignedIn } from "../../redux/authReducer";

const getNavLinkClassNames = ({ isActive }) =>
  clsx(css.headerLink, {
    [css.active]: isActive,
  });

const Layout = ({ children }) => {
  const isSignedIn = useSelector(selectUserIsSignedIn);
  const userData = useSelector(selectUserData);

  return (
    <div>
      <header className={css.header}>
        {isSignedIn ? (
          <>
            <NavLink className={getNavLinkClassNames} to="/home">
              Home
            </NavLink>
            <NavLink className={getNavLinkClassNames} to="/products" end>
              Products
            </NavLink>
            <NavLink className={getNavLinkClassNames} to="/search">
              Search
            </NavLink>
            <NavLink className={getNavLinkClassNames} to="/contacts">
              Contacts
            </NavLink>
            <span>Hello, {userData.name}!</span>
            <button type="button">Logout</button>
          </>
        ) : (
          <>
            <NavLink className={getNavLinkClassNames} to="/">
              Welcome
            </NavLink>
            <NavLink className={getNavLinkClassNames} to="/login">
              Login
            </NavLink>
            <NavLink className={getNavLinkClassNames} to="/register">
              Register
            </NavLink>
          </>
        )}
      </header>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
