import Head from "next/head";
import { Fragment, useReducer, useCallback } from "react";
import uuid from "uuid/v4";

import initialState from "../fixtures/initial-state";

import GrudgeList from "../components/grudge-list";
import NewGrudge from "../components/new-grudge";
import { GRUDGE_ADD, GRUDGE_FORGIVE } from "../constants/grudge";

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

function PageIndex() {
  const [grudges, dispatchGrudges] = useReducer(grudgesReducer, initialState);

  const addGrudge = useCallback(
    ({ person, reason }) => {
      dispatchGrudges({
        type: GRUDGE_ADD,
        payload: {
          id: uuid(),
          person,
          reason,
          forgiven: false,
        },
      });
    },
    [dispatchGrudges],
  );

  const toggleForgiveness = useCallback(
    (id) => {
      dispatchGrudges({
        type: GRUDGE_FORGIVE,
        payload: { id },
      });
    },
    [dispatchGrudges],
  );

  return (
    <Fragment>
      <Head>
        <title>Next.js - Grudge List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="app">
        <NewGrudge onSubmit={addGrudge} />
        <GrudgeList grudges={grudges} onForgive={toggleForgiveness} />
      </main>
    </Fragment>
  );
}

export default PageIndex;
