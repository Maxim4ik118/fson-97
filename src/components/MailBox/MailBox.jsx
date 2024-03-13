import { useContext, useEffect, useMemo, useState } from "react";

import css from "./MailBox.module.css";
import useFeedback from "../../hooks/useFeedback";

/* 
 Реакція на монтування компоненти:
  1. Надсилати мережеві запити, коли компонента відмалювалася.
  2. Вішати глобальні слухачі події(addEventListener) та setTimeout|setInterval.
  3. Зчитати, а краще синхронізувати дані з localStorage.

 Реакція на ДЕмонтування компоненти(clean up function):
  1. Відхиляються мережеві запити, перед тим, як компонента зникне.
  2. Прибираються глобальні слухачі події(removeEventListener) та clearTimeout|clearInterval.
 
 Реакція на оновлення компоненти(синхронізація):
  1. Надсилаються мережеві запити з актуальними данними.
  2. Синхронізуються дані з localStorage.


*/

const MailBox = ({ emails, onClose, onDeleteEmail }) => {
  const { totalFeedback, feedback } = useFeedback();
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div>
      <h2>
        <button onClick={onClose}>Close Mailbox</button>
      </h2>
      <ul>
        <li>Good:{feedback.good} </li>
        <li>Neutral: {feedback.neutral}</li>
        <li>Bad: {feedback.bad}</li>
      </ul>
      <h2>Total feedback: {totalFeedback}</h2>
      <ul>
        {emails.map((email) => {
          const userBackgroundColor =
            email.preferredColor !== null ? email.preferredColor : "grey";

          return (
            <li className={css.listItem} key={email.id}>
              <p>
                User name:{" "}
                <span
                  style={{
                    backgroundColor: userBackgroundColor,
                  }}
                  className={css.listItemColor}
                />
                <b>{email.userName}</b>
              </p>
              <p>
                Email: <b>{email.email}</b>
              </p>
              <p>
                <b>
                  Current subscription plan is {'"'}
                  {email.subscription}
                  {'"'}
                </b>
              </p>
              <button onClick={() => onDeleteEmail(email.id)}>&times;</button>
            </li>
          );
        })}
      </ul>
      <button type="button">Send mail</button>
    </div>
  );
};

export default MailBox;
