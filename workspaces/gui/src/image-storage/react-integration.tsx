import { createContext, useContext, useState } from "react";
import ImageStorage from "./image-storage";

const ImageStorageContext = createContext<ImageStorage | null>(null);

function ImageStorageProvider({ children }: { children: React.ReactNode }) {
  const [imageStorage] = useState(() => new ImageStorage());
  return (
    <ImageStorageContext.Provider value={imageStorage}>{children}</ImageStorageContext.Provider>
  );
}

function useImageStorage() {
  const ctx = useContext(ImageStorageContext);
  if (ctx === null) {
    throw new Error("useImageStorage must be used with ImageStorageProvider.");
  }
  return ctx;
}

export { ImageStorageContext, ImageStorageProvider, useImageStorage };
