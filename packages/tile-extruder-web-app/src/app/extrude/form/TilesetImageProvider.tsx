"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useObjectUrl } from "@/app/extrude/form/useObjectUrl";

interface TilesetImageContextType {
  imageFile: File | null;
  imageObjectUrl: string | null;
  setImageFile: (imageFile: File | null) => void;
  isImageLoading: boolean;
  imageElement: HTMLImageElement | null;
}

const TilesetImageContext = createContext<TilesetImageContextType | undefined>(undefined);

export function TilesetImageProvider({ children }: { children: ReactNode }) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
  const { setObjectUrlFromFile, objectUrl: imageObjectUrl, clearObjectUrl } = useObjectUrl();

  useEffect(() => {
    if (imageObjectUrl) {
      setIsImageLoading(true);
      const img = new Image();
      img.onload = () => {
        setImageElement(img);
        setIsImageLoading(false);
      };
      img.onerror = () => {
        setIsImageLoading(false);
        setImageElement(null);
      };
      img.src = imageObjectUrl;
    }
  }, [imageObjectUrl]);

  const handleSetImage = (newImage: File | null) => {
    if (newImage) {
      setObjectUrlFromFile(newImage);
      setImageFile(newImage);
    } else {
      clearObjectUrl();
      setImageElement(null);
      setImageFile(null);
    }
  };

  return (
    <TilesetImageContext.Provider
      value={{
        imageFile,
        imageObjectUrl,
        setImageFile: handleSetImage,
        isImageLoading,
        imageElement,
      }}
    >
      {children}
    </TilesetImageContext.Provider>
  );
}

export function useTilesetImage() {
  const context = useContext(TilesetImageContext);
  if (context === undefined) {
    throw new Error("useTilesetImage must be used within a TilesetImageProvider");
  }
  return context;
}
