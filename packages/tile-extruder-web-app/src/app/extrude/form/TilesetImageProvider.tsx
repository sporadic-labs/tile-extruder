"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useObjectUrl } from "@/app/extrude/form/useObjectUrl";

interface TilesetImageContextType {
  imageFile: File | null;
  imageName: string;
  imageObjectUrl: string | null;
  setImageFile: (imageFile: File | null) => void;
  isImageLoading: boolean;
  imageElement: HTMLImageElement | null;
}

const TilesetImageContext = createContext<TilesetImageContextType | undefined>(undefined);

const defaultImageName = "unknown.png";

export function TilesetImageProvider({ children }: { children: ReactNode }) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
  const [imageName, setImageName] = useState<string>(defaultImageName);
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
      setImageName(newImage.name ?? "unknown.png");
    } else {
      clearObjectUrl();
      setImageElement(null);
      setImageFile(null);
      setImageName(defaultImageName);
    }
  };

  return (
    <TilesetImageContext.Provider
      value={{
        imageFile,
        imageName,
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
