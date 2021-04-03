import Head from "next/head";
import { useContext } from "react";
import { GrudgeContext } from "../store/grudge";

import GrudgeList from "../components/grudge-list";
import NewGrudge from "../components/new-grudge";

function PageIndex() {
  const { undoGrudge, redoGrudge, hasPastGrudge, hasFutureGrudge } = useContext(
    GrudgeContext,
  );

  return (
    <>
      <Head>
        <title>Next.js - Grudge List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="app">
        <NewGrudge />
        <section className="undo-redo">
          <button disabled={!hasPastGrudge} onClick={undoGrudge}>
            Undo
          </button>
          <button disabled={!hasFutureGrudge} onClick={redoGrudge}>
            Redo
          </button>
        </section>
        <GrudgeList />
      </main>
    </>
  );
}

export default PageIndex;
