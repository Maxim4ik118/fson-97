import { useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";

import MailBox from "../components/MailBox/MailBox";
import MailBoxForm from "../components/MailBoxForm/MailBoxForm";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmail,
  deleteEmail,
  selectEmailFilter,
  selectEmails,
  selectFilteredEmails,
  selectShowMailBox,
  setFilter,
  toggleMailBox,
} from "../redux/emailsReducer";

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
  const dispatch = useDispatch();
  // const emails = useSelector(selectEmails);
  const showMailBox = useSelector(selectShowMailBox);
  const filter = useSelector(selectEmailFilter);
  const filteredEmails = useSelector(selectFilteredEmails)

  const onFilter = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleDelete = (mailId) => {
    dispatch(deleteEmail(mailId)); // -> {type: "deleteEmail", payload: mailId}
  };

  const handleToggleMailBox = () => {
    dispatch(toggleMailBox());
  };

  const onAddNewMailBox = (mailData) => {
    const finalMail = {
      ...mailData,
      id: nanoid(),
    };
    dispatch(addEmail(finalMail));
  };

  // АНАЛОГІЧНИЙ ВАРІАНТ ДО createSelector
  // const filteredEmails = useMemo(
  //   () =>
  //     emails.filter(
  //       (email) =>
  //         email.email.toLowerCase().includes(filter.trim().toLowerCase()) ||
  //         email.userName.toLowerCase().includes(filter.trim().toLowerCase())
  //     ),
  //   [emails, filter]
  // );

  return (
    <div>
      <MailBoxForm onAddNewMailBox={onAddNewMailBox} />

      <button onClick={handleToggleMailBox}>
        {showMailBox ? "Hide" : "Show"} MailBox
      </button>

      {showMailBox ? (
        <div>
          <input type="text" value={filter} onChange={onFilter} />
          <MailBox
            emails={filteredEmails}
            onClose={handleToggleMailBox}
            onDeleteEmail={handleDelete}
          />
        </div>
      ) : null}
    </div>
  );
}

export default HomePage;
