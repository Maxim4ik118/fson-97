import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserIsSignedIn } from "../../redux/authReducer";

const RestrictedRoute = ({ children, redirectTo = "/contacts" }) => {
  const isSignedIn = useSelector(selectUserIsSignedIn);

  return isSignedIn ? <Navigate to={redirectTo} replace /> : children;
};

export default RestrictedRoute;
