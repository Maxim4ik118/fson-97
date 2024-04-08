import { useDispatch, useSelector } from "react-redux";
import { apiLoginUser } from "../redux/authReducer";
import LoginForm from "../components/LoginForm/LoginForm";

const LoginPage = () => {
    const dispatch = useDispatch();

    const onLogin = (formData) => {
        dispatch(apiLoginUser(formData));
    }

    return (
        <div>
            <LoginForm onLogin={onLogin} />
        </div>
    );
}

export default LoginPage;
