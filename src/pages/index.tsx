import Head from "next/head";
import { useContext } from "react";
import { GrudgeContext } from "../contexts/grudge";

import GrudgeList from "../components/grudge-list";
import NewGrudge from "../components/new-grudge";

function PageIndex() {
  const { undoGrudge, hasPastGrudge } = useContext(GrudgeContext);

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
          <button>Redo</button>
        </section>
        <GrudgeList />
      </main>
    </>
  );
}

export default PageIndex;
