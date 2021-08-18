import DropZone from "../file-drop-zone";
import { useImageStorage } from "../image-storage/react-integration";
import InputForm from "../input-form";
import { setInputImage } from "../store/extruder-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function Home() {
  const imageStorageId = useAppSelector((state) => state.extruder.imageStorageId);
  const dispatch = useAppDispatch();
  const imageStorage = useImageStorage();

  const hasUploadedImage = imageStorageId && imageStorage.has(imageStorageId);

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

  return (
    <main>
      <h1>Tile Extruder</h1>
      {hasUploadedImage ? <InputForm /> : <DropZone onFileDrop={onFile} />}
    </main>
  );
}
