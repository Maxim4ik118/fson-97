import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import MailBox from "../components/MailBox/MailBox";
import MailBoxForm from "../components/MailBoxForm/MailBoxForm";


const emailsData = [
  {
    id: "1",
    email: "foo@bar.com",
    userName: "Arab",
    preferredColor: null,
    subscription: "standart",
  },
  {
    id: "2",
    email: "alex1336@bar.com",
    userName: "Alex",
    preferredColor: null,
    subscription: "premium",
  },
  {
    id: "3",
    email: "maxIm0981@gmail.com",
    userName: "Kiril",
    preferredColor: null,
    subscription: "vip",
  },
];

function HomePage() {
  const [emails, setEmails] = useState(() => {
    const stringifiedEmails = localStorage.getItem("emails");
    if (!stringifiedEmails) return emailsData;

    const parsedEmails = JSON.parse(stringifiedEmails);
    return parsedEmails;
  });
  const [showMailBox, setShowMailBox] = useState(false);

  useEffect(() => {
    localStorage.setItem("emails", JSON.stringify(emails));
  }, [emails]);

  const handleDelete = (mailId) => {
    setEmails((prevState) => prevState.filter((email) => email.id !== mailId));
  };

  const handleToggleMailBox = () => {
    setShowMailBox((prevState) => !prevState);
  };

  const onAddNewMailBox = (mailData) => {
    const finalMail = {
      ...mailData,
      id: nanoid(),
    };
    // setEmails([...emails, finalMail]); ❌
    setEmails((prevState) => [...prevState, finalMail]); // ✅
  };

  return (
    <div>
      <MailBoxForm onAddNewMailBox={onAddNewMailBox} />

      <button onClick={handleToggleMailBox}>
        {showMailBox ? "Hide" : "Show"} MailBox
      </button>

      {showMailBox ? (
        <MailBox
          emails={emails}
          onClose={handleToggleMailBox}
          onDeleteEmail={handleDelete}
        />
      ) : null}
    </div>
  );
}

export default HomePage;