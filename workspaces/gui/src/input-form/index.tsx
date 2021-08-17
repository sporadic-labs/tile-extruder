import Image from "next/image";
import { ChangeEventHandler, useState } from "react";
import { setInputImage } from "../store/extruder-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useImageStorage } from "../image-storage/react-integration";
import css from "./index.module.scss";

function InputForm() {
  const extruderConfig = useAppSelector((state) => state.extruder);
  const dispatch = useAppDispatch();
  const imageStorage = useImageStorage();
  const [errorMessage, setErrorMessage] = useState("");

  const onImageChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setErrorMessage("No image selected. Please try again.");
    } else {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        try {
          const [id, data] = await imageStorage.addFromFile(file);
          dispatch(
            setInputImage({
              width: data.width,
              height: data.height,
              name: file.name,
              type: file.type,
              imageId: id,
            })
          );
        } catch (err) {
          setErrorMessage("Something went wrong loading that image. Please try again.");
          console.error(err);
        }
      } else {
        setErrorMessage("Not a valid image! Please try uploading another file.");
      }
    }
  };

  let inputImage;
  if (extruderConfig.imageStorageId) {
    const image = imageStorage.get(extruderConfig.imageStorageId)!;
    inputImage = (
      <figure>
        <Image
          unoptimized
          src={image.objectUrl}
          width={extruderConfig.width}
          height={extruderConfig.height}
          alt="Input Tileset"
        />
        <figcaption>
          <p>{extruderConfig.name}</p>
          <p>{extruderConfig.type}</p>
          <p>
            {extruderConfig.width}px x {extruderConfig.height}px
          </p>
        </figcaption>
      </figure>
    );
  }

  return (
    <form>
      <label className={css.fileLabel} htmlFor="file">
        Click to Upload
      </label>
      <input
        id="file"
        className={css.fileInput}
        type="file"
        accept="image/*"
        onChange={onImageChange}
      />
      {errorMessage && <p className={css.error}>{errorMessage}</p>}
      {inputImage}
    </form>
  );
}

export default InputForm;
