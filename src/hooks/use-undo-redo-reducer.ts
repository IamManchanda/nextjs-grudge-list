import { useReducer } from "react";

import { GRUDGE_UNDO, GRUDGE_REDO } from "../constants/grudge";

const useUndoRedoReducer = (reducer, initialState) => {
  const undoRedoState = {
    past: [],
    present: initialState,
    future: [],
  };

  const undoRedoReducer = (state, action) => {
    const newPresent = reducer(state.present, action);

    switch (action.type) {
      case GRUDGE_UNDO:
        const [newPresentAfterUndo, ...newPast] = state.past;
        return {
          past: newPast,
          present: newPresentAfterUndo,
          future: [state.present, ...state.future],
        };

      case GRUDGE_REDO:
        const [newPresentAfterRedo, ...newFuture] = state.future;
        return {
          past: [state.present, ...state.past],
          present: newPresentAfterRedo,
          future: newFuture,
        };

      default:
        return {
          past: [state.present, ...state.past],
          present: newPresent,
          future: [],
        };
    }
  };

  return useReducer(undoRedoReducer, undoRedoState);
};

export default useUndoRedoReducer;
