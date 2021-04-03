import Head from "next/head";
import { Fragment, useState } from "react";
import uuid from "uuid/v4";

import initialState from "../fixtures/initial-state";

import GrudgeList from "../components/grudge-list";
import NewGrudge from "../components/new-grudge";

function PageIndex() {
  const [grudges, setGrudges] = useState(initialState);

  function addGrudge(grudge) {
    grudge.id = uuid();
    grudge.forgiven = false;
    setGrudges([grudge, ...grudges]);
  }

  function toggleForgiveness(id) {
    setGrudges(
      grudges.map((grudge) => {
        if (grudge.id !== id) {
          return grudge;
        }
        return {
          ...grudge,
          forgiven: !grudge.forgiven,
        };
      }),
    );
  }

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
