import { useReducer, createContext, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import initialState from "../fixtures/initial-state";
import { GRUDGE_ADD, GRUDGE_FORGIVE } from "../constants/grudge";

export const GrudgeContext = createContext();

const grudgesReducer = (grudgesState, { type, payload }) => {
  switch (type) {
    case GRUDGE_ADD:
      return [payload, ...grudgesState];
    case GRUDGE_FORGIVE:
      return grudgesState.map((grudge) => {
        if (grudge.id !== payload.id) return grudge;
        return {
          ...grudge,
          forgiven: !grudge.forgiven,
        };
      });
    default:
      return grudgesState;
  }
};

export const GrudgeProvider = ({ children }) => {
  const [grudges, dispatchGrudges] = useReducer(grudgesReducer, initialState);

  function addGrudge({ person, reason }) {
    dispatchGrudges({
      type: GRUDGE_ADD,
      payload: {
        id: uuidv4(),
        person,
        reason,
        forgiven: false,
      },
    });
  }

  function toggleForgiveness(id) {
    dispatchGrudges({
      type: GRUDGE_FORGIVE,
      payload: { id },
    });
  }

  return (
    <GrudgeContext.Provider
      value={{
        grudges,
        addGrudge,
        toggleForgiveness,
      }}
    >
      {children}
    </GrudgeContext.Provider>
  );
};
