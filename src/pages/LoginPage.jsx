import { useDispatch, useSelector } from "react-redux";
import { apiLoginUser } from "../redux/authReducer";
import LoginForm from "../components/LoginForm/LoginForm";
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
  const dispatch = useDispatch();

  const onLogin = (formData) => {
    dispatch(apiLoginUser(formData));
  };

  return (
    <div>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <LoginForm onLogin={onLogin} />
    </div>
  );
};

export default LoginPage;
