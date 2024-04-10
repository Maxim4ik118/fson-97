import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectUserIsRefreshing,
  selectUserIsSignedIn,
} from "../../redux/authReducer";

const PrivateRoute = ({ children, redirectTo = "/login" }) => {
  const isSignedIn = useSelector(selectUserIsSignedIn);
  const isRefreshing = useSelector(selectUserIsRefreshing);

  return !isSignedIn && !isRefreshing ? (
    <Navigate to={redirectTo} replace />
  ) : (
    children
  );
};

export default PrivateRoute;
