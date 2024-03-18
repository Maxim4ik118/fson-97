import { forwardRef, useMemo, useRef, useState } from "react";
import MailBox from "../MailBox/MailBox";
import Feedback from "../Feedback/Feedback";

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

const MemoExample = () => {
  const [counter, setCounter] = useState(0);
  const inputRef = useRef();

  const onCounter = () => {
    setCounter((prev) => prev + 1);
    inputRef.current.focus();
  };

  return (
    <div>
      <Feedback />
      <MailBox emails={emailsData} />

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h3>Counter value: {counter}</h3>
      <button className="my-fav-btn" onClick={onCounter}>
        Click to count
      </button>
      <MyCustomInput ref={inputRef} />
    </div>
  );
};

// eslint-disable-next-line react/display-name
const MyCustomInput = forwardRef((props, ref) => {
  return (
    <input type="text" ref={ref} placeholder="Enter some text" {...props} />
  );
});

export default MemoExample;
