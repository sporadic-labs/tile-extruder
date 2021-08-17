import { ChangeEventHandler, DragEventHandler, useState } from "react";
import cn from "classnames";
import css from "./index.module.scss";

interface DropZoneProps {
  onFileDrop: (file: File) => void;
}

function DropZone({ onFileDrop }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onDragEnter: DragEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragOver: DragEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  };

  const onDragLeave: DragEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDrop: DragEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    onFileList(files);
  };

  const onImageChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files;
    onFileList(files);
  };

  const onFileList = (files: FileList | null) => {
    if (!files || files.length === 0) {
      setErrorMessage("No image selected. Please try again.");
    } else {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        try {
          onFileDrop(file);
        } catch (err) {
          setErrorMessage("Something went wrong loading that image. Please try again.");
        }
      } else {
        setErrorMessage("Not a valid image! Please try uploading another file.");
      }
    }
  };

  const className = cn(css.dropZone, isDragging && css.dropZoneActive);

  return (
    <form
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={className}
    >
      <p>Drag and drop an image here to start.</p>
      <label className={css.fileLabel} htmlFor="file">
        Select Image
      </label>
      <input
        id="file"
        className={css.fileInput}
        type="file"
        accept="image/*"
        onChange={onImageChange}
      />
      {errorMessage && <p className={css.error}>{errorMessage}</p>}
    </form>
  );
}

export default DropZone;
export type { DropZoneProps };
