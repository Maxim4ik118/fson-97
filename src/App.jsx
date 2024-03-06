import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import MailBox from "./components/MailBox/MailBox";
import MailBoxForm from "./components/MailBoxForm/MailBoxForm";
// import iconReact from "./assets/react.svg";

// const productData = [
//   {
//     id: "1_product",
//     productName: "Taco Black",
//     img: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640",
//     price: 10.99,
//     quantity: 2,
//     hasDiscount: true,
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, reprehenderit?",
//   },
//   {
//     id: "2_product",
//     productName: "Big Mak",
//     img: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640",
//     price: 6.25,
//     quantity: 7,
//     hasDiscount: false,
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, reprehenderit?",
//   },
//   {
//     id: "3_product",
//     productName: "Taco S",
//     img: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640",
//     price: 3.99,
//     quantity: 1,
//     hasDiscount: false,
//     description:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, reprehenderit?",
//   },
// ];

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

function App() {
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

export default App;
