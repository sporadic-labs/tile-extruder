"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface TilesetImageContext {
  image: File | null;
  setImage: (file: File | null) => void;
}

const TilesetContext = createContext<TilesetImageContext | undefined>(undefined);

export function TilesetImageProvider({ children }: { children: ReactNode }) {
  const [image, setImage] = useState<File | null>(null);
  return <TilesetContext.Provider value={{ image, setImage }}>{children}</TilesetContext.Provider>;
}

export function useTilesetImage() {
  const context = useContext(TilesetContext);
  if (context === undefined) {
    throw new Error("useTilesetImage must be used within a TilesetImageProvider");
  }
  return context;
}
