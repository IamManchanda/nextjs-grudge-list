import "../assets/styles/scss/styles.scss";
import { GrudgeProvider } from "../contexts/grudge";

function MyApp({ Component, pageProps }) {
  return (
    <GrudgeProvider>
      <Component {...pageProps} />
    </GrudgeProvider>
  );
}

export default MyApp;
