import { useReducer, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import initialGrudgesState from "../fixtures/initial-grudges-state";
import { GRUDGE_ADD, GRUDGE_FORGIVE, GRUDGE_UNDO } from "../constants/grudge";

export const GrudgeContext = createContext(null);

const defaultGrudgesState = {
  past: [],
  present: initialGrudgesState,
  future: [],
};

const grudgesReducer = (
  grudgesState = defaultGrudgesState,
  { type, payload },
) => {
  switch (type) {
    case GRUDGE_ADD:
      const newPresentForAdd = [
        {
          id: uuidv4(),
          ...payload,
        },
        ...grudgesState.present,
      ];
      return {
        past: [grudgesState.present, ...grudgesState.past],
        present: newPresentForAdd,
        future: [],
      };

    case GRUDGE_FORGIVE:
      const newPresentForForgive = grudgesState.present.map((grudge) => {
        if (grudge.id !== payload.id) return grudge;
        return {
          ...grudge,
          forgiven: !grudge.forgiven,
        };
      });
      return {
        past: [grudgesState.present, ...grudgesState.past],
        present: newPresentForForgive,
        future: [],
      };

    case GRUDGE_UNDO:
      const [newPresent, ...newPast] = grudgesState.past;
      return {
        past: newPast,
        present: newPresent,
        future: [grudgesState.present, ...grudgesState.future],
      };

    default:
      return grudgesState;
  }
};

export const GrudgeProvider = ({ children }) => {
  const [grudgesState, dispatchGrudges] = useReducer(
    grudgesReducer,
    defaultGrudgesState,
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
    //@ts-ignore
    dispatchGrudges({
      type: GRUDGE_UNDO,
    });
  }

  return (
    <GrudgeContext.Provider
      value={{
        grudges,
        addGrudge,
        toggleForgiveness,
        undoGrudge,
        hasPastGrudge,
        hasFutureGrudge,
      }}
    >
      {children}
    </GrudgeContext.Provider>
  );
};
