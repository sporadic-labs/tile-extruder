import { Provider } from "react-redux";
import { store, imageStorage } from "../store";
import SiteLayout from "../components/site-layout";
import type { AppProps } from "next/app";
import { ImageStorageProvider } from "../store/image-storage/react-integration";
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/400-italic.css";
import "@fontsource/raleway/700.css";
import "@fontsource/raleway/700-italic.css";
import "../global-styles/index.scss";
import { useAppDispatch } from "../store/hooks";
import { ReactNode, useEffect } from "react";
import { getSupportedCanvasBlobTypes } from "../utils/canvas-blob";
import { setSupportedExportTypes } from "../store/extruder-slice";

function InnerApp({ Component, pageProps }: AppProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getSupportedCanvasBlobTypes()
      .then((types) => dispatch(setSupportedExportTypes(types)))
      .catch(console.error);
  }, [dispatch]);

  return (
    <SiteLayout>
      <Component {...pageProps} />
    </SiteLayout>
  );
}

function MyApp(props: AppProps) {
  return (
    <ImageStorageProvider imageStorage={imageStorage}>
      <Provider store={store}>
        <InnerApp {...props} />
      </Provider>
    </ImageStorageProvider>
  );
}

export default MyApp;
