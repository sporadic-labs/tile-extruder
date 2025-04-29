"use client";

import { useCallback, useRef } from "react";
import styles from "./ImageDropZone.module.css";
import { classnames } from "../utils/classnames";

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
    if (fileInputRef.current) {
      // Clear input value to allow re-uploading the same file.
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
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
      className={classnames(styles.dropzone, className)}
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
        className={styles.fileInput}
      />
      {children}
    </div>
  );
}
