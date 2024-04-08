import { nanoid } from "nanoid";

import MailBox from "../components/MailBox/MailBox";
import MailBoxForm from "../components/MailBoxForm/MailBoxForm";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmail,
  deleteEmail,
  selectEmailFilter,
  selectFilteredEmails,
  selectShowMailBox,
  setFilter,
  toggleMailBox,
} from "../redux/emailsReducer";



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
