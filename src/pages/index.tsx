import Head from "next/head";

import GrudgeList from "../components/grudge-list";
import NewGrudge from "../components/new-grudge";

function PageIndex() {
  return (
    <>
      <Head>
        <title>Next.js - Grudge List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="app">
        <NewGrudge />
        <GrudgeList />
      </main>
    </>
  );
}

export default PageIndex;
