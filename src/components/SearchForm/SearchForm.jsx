import { Field, Form, Formik } from "formik";

const SearchForm = ({ onSetSearchQuery }) => {
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values) => {
        onSetSearchQuery(values.query);
      }}
    >
      <Form>
        <Field placeholder="Iphone" type="text" name="query" />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
};

export default SearchForm;
