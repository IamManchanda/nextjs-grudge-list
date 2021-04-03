import "../assets/styles/scss/styles.scss";
import { GrudgeProvider } from "../store/grudge";

function MyApp({ Component, pageProps }) {
  return (
    <GrudgeProvider>
      <Component {...pageProps} />
    </GrudgeProvider>
  );
}

export default MyApp;
