import { useMemo, useState } from "react";

const useFeedback = () => {
  const [feedback, setFeedback] = useState({
    good: 55,
    neutral: 10,
    bad: 560,
  });

  const totalFeedback = useMemo(
    () =>
      Object.values(feedback).reduce((prev, curr) => {
        for (let i = 0; i < 1_000_000_000; i++) {}
        return prev + curr;
      }, 0),
    [feedback]
  );

  return { feedback, totalFeedback, setFeedback };
};

export default useFeedback;
