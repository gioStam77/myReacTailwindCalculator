import React from "react";
import { ACTIONS } from "../App";

export default function ActionButton({ dispatch, operation }) {
  return (
    <button
      className="hover:bg-white rounded-sm border border-white active:bg-slate-400"
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}
