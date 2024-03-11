import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { IoPersonAddSharp } from "react-icons/io5";

import css from "./MailBoxForm.module.css";

const MailBoxSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "User name must be at least 2 characters!")
    .max(50, "User name must be less than 50 characters!")
    .required("User name is required!"),
  email: Yup.string()
    .email("Must be a valid email!")
    .required("Email is required!"),
  preferredColor: Yup.string()
    .oneOf(["red", "green", "blue"])
    .required("preferredColor is required!"),
  subscription: Yup.string().oneOf(["standart", "vip", "premium"]).required("Subscription plan is required!"),
});

const INITIAL_FORM_DATA = {
  userName: "",
  email: "",
  preferredColor: "",
  subscription: "",
};

const MailBoxForm = ({ onAddNewMailBox }) => {
  const handleSubmit = (data, formActions) => {
    onAddNewMailBox(data);
    formActions.resetForm();
  };

  return (
    <Formik
      validationSchema={MailBoxSchema}
      initialValues={INITIAL_FORM_DATA}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <h2 className={css.formTitle}>Add new mailbox</h2>

        <label className={css.label}>
          <span className={css.labelText}>User name:</span>
          <Field
            className={css.formInput}
            placeholder="Alex Mihalich"
            type="text"
            name="userName"
          />
          <ErrorMessage
            className={css.errorMsg}
            name="userName"
            component="span"
          />
        </label>
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

        <div className={css.colorsWrapper}>
          <h4>Choose your preferred color*</h4>
          <label>
            <span className={css.labelText}>Red:</span>
            <Field
              className={css.formInput}
              type="radio"
              name="preferredColor"
              value="red"
            />
          </label>
          <label>
            <span className={css.labelText}>Green:</span>
            <Field
              className={css.formInput}
              type="radio"
              name="preferredColor"
              value="green"
            />
          </label>
          <label>
            <span className={css.labelText}>Blue:</span>
            <Field
              className={css.formInput}
              type="radio"
              name="preferredColor"
              value="blue"
            />
          </label>

          <ErrorMessage
            className={css.errorMsg}
            name="preferredColor"
            component="span"
          />
        </div>

        <label>
          <span className={css.labelText}>Select user subscription:</span>
          <Field as="select" name="subscription">
            <option value="" disabled>Premium++</option>
            <option value="standart">Standart</option>
            <option value="vip">VIP</option>
            <option value="premium">Premium</option>
          </Field>
          <ErrorMessage
            className={css.errorMsg}
            name="subscription"
            component="span"
          />
        </label>

        <button
          className={css.submitBtn}
          type="submit"
          title="Click to save new mailbox"
          aria-label="Add new mailbox"
        >
          <IoPersonAddSharp />
        </button>
      </Form>
    </Formik>
  );
};

export default MailBoxForm;
