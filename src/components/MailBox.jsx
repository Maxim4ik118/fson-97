import { useEffect } from "react";

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
        {emails.map((email) => (
          <li key={email.id}>
            <p>
              User name: <b>{email.userName}</b>
            </p>
            <p>
              Email: <b>{email.email}</b>
            </p>
            <button onClick={() => onDeleteEmail(email.id)}>&times;</button>
          </li>
        ))}
        {/* <li>
          Mail 1 <button onClick={() => onDeleteEmail(1)}>&times;</button>
        </li>
        <li>
          Mail 2 <button onClick={() => onDeleteEmail(2)}>&times;</button>
        </li>
        <li>
          Mail 3 <button onClick={() => onDeleteEmail(3)}>&times;</button>
        </li> */}
      </ul>
      <button type="button">Send mail</button>
    </div>
  );
};

export default MailBox;
