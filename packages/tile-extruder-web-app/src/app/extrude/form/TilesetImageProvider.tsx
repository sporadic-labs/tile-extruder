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
  // The most recently loaded object URL and the resulting image (null if it
  // failed to load). Loading state and the current image are derived from this.
  const [loadResult, setLoadResult] = useState<{
    url: string;
    image: HTMLImageElement | null;
  } | null>(null);
  const [imageName, setImageName] = useState<string>(defaultImageName);
  const { setObjectUrlFromFile, objectUrl: imageObjectUrl, clearObjectUrl } = useObjectUrl();

  useEffect(() => {
    if (!imageObjectUrl) return;
    const img = new Image();
    img.onload = () => setLoadResult({ url: imageObjectUrl, image: img });
    img.onerror = () => setLoadResult({ url: imageObjectUrl, image: null });
    img.src = imageObjectUrl;
    return () => {
      // Ignore a stale load if the URL changes before it finishes.
      img.onload = null;
      img.onerror = null;
    };
  }, [imageObjectUrl]);

  const isImageLoading = imageObjectUrl !== null && loadResult?.url !== imageObjectUrl;
  // While a new image loads, keep showing the previous one.
  const imageElement = imageObjectUrl ? (loadResult?.image ?? null) : null;

  const handleSetImage = (newImage: File | null) => {
    if (newImage) {
      setObjectUrlFromFile(newImage);
      setImageFile(newImage);
      setImageName(newImage.name ?? "unknown.png");
    } else {
      clearObjectUrl();
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
