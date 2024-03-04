import { IoPersonAddSharp } from "react-icons/io5";

import css from "./MailBoxForm.module.css";
import { useState } from "react";

const MailBoxForm = ({ onAddNewMailBox }) => {
  //   const [userName, setUserName] = useState("");
  //   const [email, setEmail] = useState("");
  const [values, setValues] = useState({
    userName: "",
    email: "",
  });

  const handleChange = (e) => {
    // if (e.target.name === "userName") {
    //   setUserName(e.target.value);
    // } else if (e.target.name === "email") {
    //   setEmail(e.target.value);
    // }

    const key = e.target.name;
    const value = e.target.value;
    // { userName: "Max", email: "max", email: "max@"  }
    // { userName: "Max", email: "max@"  }
    setValues({ ...values, [key]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // const elements = e.currentTarget.elements;

    // const userName = elements.userName.value;
    // const email = elements.email.value;

    const formData = {
      userName: values.userName,
      email: values.email,
    };

    onAddNewMailBox(formData);

    setValues({
      userName: "",
      email: "",
    });
  };

  return (
    <form onSubmit={handleFormSubmit} className={css.form}>
      <h2 className={css.formTitle}>Add new mailbox</h2>
      <label className={css.label}>
        <span className={css.labelText}>User name:</span>
        <input
          className={css.formInput}
          placeholder="Alex Mihalich"
          type="text"
          name="userName"
          value={values.userName}
          onChange={handleChange}
          required
        />
      </label>
      <label className={css.label}>
        <span className={css.labelText}>Email:</span>
        <input
          className={css.formInput}
          placeholder="alex@patron.com"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>
      {values.userName === "@present2024" && (
        <p>Congratulations! You won a 20% discount promo - #231D3🎉</p>
      )}
      <button
        className={css.submitBtn}
        type="submit"
        title="Click to save new mailbox"
        aria-label="Add new mailbox"
      >
        <IoPersonAddSharp />
      </button>
    </form>
  );
};

export default MailBoxForm;
