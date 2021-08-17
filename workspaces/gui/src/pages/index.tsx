import Image from "next/image";
import DropZone from "../file-drop-zone";
import { useImageStorage } from "../image-storage/react-integration";
import { setInputImage } from "../store/extruder-slice";
import { useAppSelector, useAppDispatch } from "../store/hooks";

export default function Home() {
  const extruderConfig = useAppSelector((state) => state.extruder);
  const dispatch = useAppDispatch();
  const imageStorage = useImageStorage();

  const onFile = async (file: File) => {
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
      console.log(err);
      // TODO: error needs to be passed back to drop zone, or refactored.
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
    <main>
      <h1>Tile Extruder</h1>
      <DropZone onFileDrop={onFile} />
      {inputImage}
    </main>
  );
}
