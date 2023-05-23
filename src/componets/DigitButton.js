import React from "react";
import { ACTIONS } from "../App";

export default function DigitButton({ dispatch, digit }) {
  return (
    <button
      className="hover:bg-white rounded-sm border border-white active:bg-slate-400"
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
