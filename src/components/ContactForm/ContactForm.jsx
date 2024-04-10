import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import css from "./ContactForm.module.css";

const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  number: Yup.string()
    .required("Number is required!")
    .min(6, "Number must be at least 6 characters!"),
});

const INITIAL_FORM_DATA = {
  name: "",
  number: "",
};

const ContactForm = ({ onAddContact }) => {
  const handleSubmit = (data, formActions) => {
    onAddContact(data);
    formActions.resetForm();
  };

  return (
    <Formik
      validationSchema={ContactSchema}
      initialValues={INITIAL_FORM_DATA}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <h2 className={css.formTitle}>Add New Contact</h2>

        <label className={css.label}>
          <span className={css.labelText}>Name:</span>
          <Field
            className={css.formInput}
            placeholder="Ivan Ivanovich"
            type="text"
            name="name"
          />
          <ErrorMessage className={css.errorMsg} name="name" component="span" />
        </label>
        <label className={css.label}>
          <span className={css.labelText}>Number:</span>
          <Field
            className={css.formInput}
            placeholder="+(380)-000-00-00"
            type="text"
            name="number"
          />
          <ErrorMessage
            className={css.errorMsg}
            name="number"
            component="span"
          />
        </label>

        <button
          className={css.submitBtn}
          type="submit"
          title="Click to create new contact"
          aria-label="Add new contact"
        >
          Add new contact 🤷‍♂️
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
