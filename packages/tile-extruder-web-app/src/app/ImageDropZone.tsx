"use client";

import { useCallback, useRef } from "react";

interface ImageDropZoneProps {
  onDrop: (files: File[]) => void;
  children?: React.ReactNode;
  className?: string;
}

const filterToImageFiles = (files: FileList): File[] => {
  return Array.from(files).filter((f) => f.type.startsWith("image/"));
};

export default function ImageDropZone({ onDrop, children, className = "" }: ImageDropZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files ? filterToImageFiles(e.target.files) : [];
      if (files.length > 0) {
        onDrop(files);
      }
    },
    [onDrop]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const files = e.dataTransfer.files ? filterToImageFiles(e.dataTransfer.files) : [];
      if (files.length > 0) {
        onDrop(files);
      }
    },
    [onDrop]
  );

  return (
    <div
      className={`h-full text-center cursor-pointer flex items-center justify-center ${className}`}
      onClick={handleClick}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
      {children}
    </div>
  );
}
