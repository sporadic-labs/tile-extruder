import { Provider } from "react-redux";
import { store } from "../store";
import SiteLayout from "../components/site-layout";
import type { AppProps } from "next/app";
import { ImageStorageProvider } from "../image-storage/react-integration";
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
