import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import ContactForm from "../components/ContactForm/ContactForm";
import {
  apiAddUserContact,
  apiDeleteUserContact,
  apiGetUserContacts,
  selectPhonebookContacts,
  selectPhonebookIsError,
  selectPhonebookIsLoading,
} from "../redux/phonebookReducer";
import { useEffect } from "react";
import Loader from "../components/Loader/Loader";
import { ErrorMessage } from "formik";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectPhonebookContacts);
  const isLoading = useSelector(selectPhonebookIsLoading);
  const isError = useSelector(selectPhonebookIsError);

  useEffect(() => {
    dispatch(apiGetUserContacts());
  }, [dispatch]);

  const onAddContact = (formData) => {
    dispatch(apiAddUserContact(formData));
  };

  const onDeleteContact = (contactId) => {
    dispatch(apiDeleteUserContact(contactId));
  };

  return (
    <div>
      <Helmet>
        <title>Contacts</title>
      </Helmet>
      <ContactForm onAddContact={onAddContact} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <ul>
        {contacts !== null &&
          contacts.map((contact) => {
            return (
              <li key={contact.id}>
                <h3>Name: {contact.name}</h3>
                <p>Phone: {contact.number}</p>
                <button
                  onClick={() => onDeleteContact(contact.id)}
                  type="button"
                  aria-label="Delete contact"
                >
                  &times;
                </button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default ContactsPage;
