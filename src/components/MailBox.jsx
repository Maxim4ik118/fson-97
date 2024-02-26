const MailBox = ({ emails, onLogEmail, onDeleteEmail, emailCounter }) => {
  return (
    <div>
      <h2>
        MailBox <b>{emailCounter}</b>
      </h2>
      <ul>
        {emails.map((email) => (
          <li key={email.id}>
            {email.email}{" "}
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
      <button onClick={onLogEmail} type="button">
        Send mail
      </button>
    </div>
  );
};

export default MailBox;
