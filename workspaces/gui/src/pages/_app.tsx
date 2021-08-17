import { Provider } from "react-redux";
import { store } from "../store";
import SiteLayout from "../components/site-layout";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </Provider>
  );
}

export default MyApp;
