import useFeedback from "../../hooks/useFeedback";

const Feedback = () => {
  const { totalFeedback, feedback, setFeedback } = useFeedback();

  return (
    <div>
      <ul>
        <li>Good:{feedback.good} </li>
        <li>Neutral: {feedback.neutral}</li>
        <li>Bad: {feedback.bad}</li>
      </ul>
      <h2>Total feedback: {totalFeedback}</h2>
      <button
        onClick={() => setFeedback({ ...feedback, bad: feedback.bad + 1 })}
      >
        Increase bad
      </button>
    </div>
  );
};

export default Feedback;
