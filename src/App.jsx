import { useState } from "react";
import MailBox from "./components/MailBox";

import ProductGallery from "./components/ProductGallery/ProductGallery";
// import iconReact from "./assets/react.svg";

const productData = [
  {
    id: "1_product",
    productName: "Taco Black",
    img: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640",
    price: 10.99,
    quantity: 2,
    hasDiscount: true,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, reprehenderit?",
  },
  {
    id: "2_product",
    productName: "Big Mak",
    img: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640",
    price: 6.25,
    quantity: 7,
    hasDiscount: false,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, reprehenderit?",
  },
  {
    id: "3_product",
    productName: "Taco S",
    img: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640",
    price: 3.99,
    quantity: 1,
    hasDiscount: false,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, reprehenderit?",
  },
];

const emailsData = [
  { id: "1", email: "foo@bar.com" },
  { id: "2", email: "alex1336@bar.com" },
  { id: "3", email: "maxIm0981@gmail.com" },
];

function App() {
  const [counter, setCounter] = useState(0);
  const [emails, setEmails] = useState(emailsData);
  const [showMailBox, setShowMailBox] = useState(false);

  const onLogEmail = () => {
    console.log("Email was sent");
    setCounter((prevState) => prevState + 1);

    // setCounter(counter + 1) ❌
    // setCounter((prevState) => prevState + 1) ✅
  };

  const handleDelete = (mailId) => {
    setEmails((prevState) => prevState.filter((email) => email.id !== mailId));
    // mailId = 3
    // [{id: 1}, {id: 2}, {id: 3}]
    // [{id: 1}, ] 1 !== 3 // true
    // [{id: 1}, {id: 2}] 2 !== 3 // true
    // [{id: 1}, {id: 2}] 3 !== 3 // false
  };

  const handleToggleMailBox = () => {
    setShowMailBox((prevState) => !prevState);
  };

  return (
    <div>
      <h1>Email Counter: {counter}</h1>
      <button onClick={handleToggleMailBox}>
        {showMailBox ? "Hide" : "Show"} MailBox
      </button>

      {showMailBox ? (
        <MailBox
          emails={emails}
          emailCounter={counter}
          onLogEmail={onLogEmail}
          onDeleteEmail={handleDelete}
        />
      ) : null}

      <ProductGallery productData={productData} />
    </div>
  );
}

export default App;
