import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import css from "./LoginForm.module.css";

const UserRegisterSchema = Yup.object().shape({
    email: Yup.string().required("Email is required!")
        .email("Must be a valid email!")
    ,
    password: Yup.string().required("Password is required!")
        .min(8, "Password must be at least 8 characters!")
    ,
});

const INITIAL_FORM_DATA = {
    email: "",
    password: "",
};

const LoginForm = ({ onLogin }) => {
    const handleSubmit = (data, formActions) => {
        onLogin(data);
        formActions.resetForm();
    };

    return (
        <Formik
            validationSchema={UserRegisterSchema}
            initialValues={INITIAL_FORM_DATA}
            onSubmit={handleSubmit}
        >
            <Form className={css.form}>
                <h2 className={css.formTitle}>Login</h2>

                <label className={css.label}>
                    <span className={css.labelText}>Email:</span>
                    <Field
                        className={css.formInput}
                        placeholder="alex@patron.com"
                        type="text"
                        name="email"
                    />
                    <ErrorMessage
                        className={css.errorMsg}
                        name="email"
                        component="span"
                    />
                </label>
                <label className={css.label}>
                    <span className={css.labelText}>Password:</span>
                    <Field
                        className={css.formInput}
                        placeholder="Enter your password"
                        type="password"
                        name="password"
                    />
                    <ErrorMessage
                        className={css.errorMsg}
                        name="password"
                        component="span"
                    />
                </label>


                <button
                    className={css.submitBtn}
                    type="submit"
                    title="Click to register user"
                    aria-label="Add new mailbox"
                >
                    Sign In 😜
                </button>
            </Form>
        </Formik>
    );
};

export default LoginForm;
