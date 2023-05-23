/* eslint-disable default-case */
import { useReducer } from "react";
import "./App.css";
import ActionButton from "./componets/ActionButton";
import DigitButton from "./componets/DigitButton";

export const ACTIONS = {
  DELETE: "delete",
  REMOVE: "remove",
  CHOOSE_OPERATION: "choose-operation",
  ADD_DIGIT: "add-digit",
  CLEAR: "clear",
  EVALUATE: "evaluate",
};

const initialState = {
  currentOperator: "",
  prevOperator: "",
  operation: "",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperator: payload.digit,
          overwrite: false,
        };
      }
      // eslint-disable-next-line eqeqeq
      if (payload.digit == "0" && state.currentOperator === "0") return state;
      if (payload.digit === "." && state.currentOperator.includes("."))
        return state;
      if (payload.digit === "." && state.currentOperator === "") return state;

      return {
        ...state,
        currentOperator: `${state.currentOperator || ""}${payload.digit}`,
      };
    case ACTIONS.CLEAR:
      return initialState;
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperator === "" && state.prevOperator === "") {
        return state;
      }
      if (state.currentOperator === "") {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.prevOperator === "")
        return {
          ...state,
          prevOperator: state.currentOperator,
          operation: payload.operation,
          currentOperator: "",
        };
      return {
        ...state,
        prevOperator: evaluate(state),
        operation: payload.operation,
        currentOperator: "",
      };
    case ACTIONS.DELETE:
      if (state.overwrite)
        return {
          ...state,
          overwrite: false,
          currentOperator: "",
        };
      if (state.currentOperator === "") return state;
      if (state.currentOperator.length === 1) {
        return { ...state, currentOperator: null };
      }
      return {
        ...state,
        currentOperator: state.currentOperator.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
      if (
        state.operation === null ||
        state.currentOperator === null ||
        state.prevOperator === null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        prevOperator: "",
        operation: "",
        currentOperator: evaluate(state),
      };

    default:
      return state;
  }
}
function evaluate({ currentOperator, prevOperator, operation }) {
  const prev = parseFloat(prevOperator);
  const current = parseFloat(currentOperator);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
  }
  return computation.toString();
}

function App() {
  const [{ currentOperator, prevOperator, operation }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="container min-h-screen mx-auto  bg-red-300 flex items-center justify-center ">
      <div className="">
        <div className="grid grid-cols-4  gap-4 p-2 w-52 border border-white">
          <div className="row-span-4 col-span-4 row-end-auto text-right flex flex-col justify-between break-all border border-white">
            <div className="font-semibold ">
              {prevOperator} {operation}
            </div>
            <div className="font-bold">{currentOperator}</div>{" "}
          </div>

          <button
            onClick={() => dispatch({ type: ACTIONS.CLEAR })}
            className="col-span-2 btn border hover:bg-white rounded-sm active:bg-slate-400"
          >
            AC
          </button>
          <button
            onClick={() => dispatch({ type: ACTIONS.DELETE })}
            className="col-span-2 border hover:bg-white rounded-sm active:bg-slate-400"
          >
            DELL
          </button>

          {[...Array(10).keys()].map((x) => (
            <DigitButton
              key={x}
              dispatch={dispatch}
              digit={x}
            />
            // <button
            //   onClick={() =>
            //     dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: x } })
            //   }
            //   className="hover:bg-white rounded-sm border border-white active:bg-slate-400"
            //   key={x}
            // >
            //   {x}
            // </button>
          ))}
          {/* <button
            onClick={() =>
              dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: "." } })
            }
            className="hover:bg-white rounded-sm border border-white active:bg-slate-400"
          >
            .
          </button> */}
          <DigitButton
            dispatch={dispatch}
            digit={"."}
          />
          <ActionButton
            dispatch={dispatch}
            operation={"/"}
          />
          <ActionButton
            dispatch={dispatch}
            operation={"+"}
          />
          <ActionButton
            dispatch={dispatch}
            operation={"-"}
          />
          <ActionButton
            dispatch={dispatch}
            operation={"*"}
          />
          <button
            onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
            className="hover:bg-white rounded-sm border border-white active:bg-slate-400"
          >
            =
          </button>
          {/* <ActionButton
            dispatch={dispatch}
            operation={"="}
          /> */}

          {/* <button className="hover:bg-white rounded-sm border border-white active:bg-slate-400">
            /
          </button>
          <button className="hover:bg-white rounded-sm border border-white active:bg-slate-400">
            +
          </button>
          <button className="hover:bg-white rounded-sm border border-white active:bg-slate-400">
            -
          </button>
          <button className="hover:bg-white rounded-sm border border-white active:bg-slate-400">
            *
          </button>
          <button className="hover:bg-white rounded-sm border border-white active:bg-slate-400">
            =
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default App;
