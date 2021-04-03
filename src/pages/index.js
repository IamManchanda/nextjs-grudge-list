import Head from "next/head";
import { Fragment } from "react";

import GrudgeList from "../components/grudge-list";
import NewGrudge from "../components/new-grudge";

function PageIndex() {
  return (
    <Fragment>
      <Head>
        <title>Next.js - Grudge List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="app">
        <NewGrudge />
        <GrudgeList />
      </main>
    </Fragment>
  );
}

export default PageIndex;
