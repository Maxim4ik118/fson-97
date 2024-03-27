import { useDispatch, useSelector } from "react-redux";
import {
  decrementCounter,
  incrementCounter,
} from "../../redux/productDetailReducer";

const ReduxCounter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.productDetails.counter);

  return (
    <div>
      <h2>Counter: {counter}</h2>
      <button onClick={() => dispatch(decrementCounter())}>
        Click to decrement
      </button>
      <button onClick={() => dispatch(incrementCounter())}>
        Click to increment
      </button>
    </div>
  );
};

export default ReduxCounter;
