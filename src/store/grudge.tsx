import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import initialGrudgesState from "../fixtures/initial-grudges-state";
import {
  GRUDGE_ADD,
  GRUDGE_FORGIVE,
  GRUDGE_UNDO,
  GRUDGE_REDO,
} from "../constants/grudge";
import useUndoRedoReducer from "../hooks/use-undo-redo-reducer";

export const GrudgeContext = createContext(null);

const grudgesReducer = (
  grudgesState = initialGrudgesState,
  { type, payload },
) => {
  switch (type) {
    case GRUDGE_ADD:
      return [
        {
          id: uuidv4(),
          ...payload,
        },
        ...grudgesState,
      ];

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
  const [grudgesState, dispatchGrudges] = useUndoRedoReducer(
    grudgesReducer,
    initialGrudgesState,
  );

  const grudges = grudgesState.present;
  const hasPastGrudge = Boolean(grudgesState.past.length);
  const hasFutureGrudge = Boolean(grudgesState.future.length);

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

  function undoGrudge() {
    dispatchGrudges({
      type: GRUDGE_UNDO,
      payload: {},
    });
  }

  function redoGrudge() {
    dispatchGrudges({
      type: GRUDGE_REDO,
      payload: {},
    });
  }

  return (
    <GrudgeContext.Provider
      value={{
        grudges,
        addGrudge,
        toggleForgiveness,
        undoGrudge,
        redoGrudge,
        hasPastGrudge,
        hasFutureGrudge,
      }}
    >
      {children}
    </GrudgeContext.Provider>
  );
};
