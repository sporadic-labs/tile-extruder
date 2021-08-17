import { Provider } from "react-redux";
import { store } from "../store";
import SiteLayout from "../components/site-layout";
import type { AppProps } from "next/app";
import { ImageStorageProvider } from "../image-storage/react-integration";
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/400-italic.css";
import "@fontsource/raleway/700.css";
import "@fontsource/raleway/700-italic.css";
import "../global-styles/index.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ImageStorageProvider>
      <Provider store={store}>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </Provider>
    </ImageStorageProvider>
  );
}

export default MyApp;
