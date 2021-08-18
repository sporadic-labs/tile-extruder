import DropZone from "../features/file-drop-zone";
import { useImageStorage } from "../store/image-storage/react-integration";
import InputForm from "../features/input-form";
import OutputForm from "../features/output-form";
import { setInputImage, setTileHeight, setTileWidth } from "../store/extruder-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import testTileset from "../assets/tilesets/test-tileset.png";

export default function Home() {
  const imageStorageId = useAppSelector((state) => state.extruder.imageStorageId);
  const dispatch = useAppDispatch();
  const imageStorage = useImageStorage();

  const hasUploadedImage = imageStorageId && imageStorage.has(imageStorageId);
  async function addTest() {
    const [id, data] = await imageStorage.addFromPath(testTileset.src);
    dispatch(
      setInputImage({
        width: data.width,
        height: data.height,
        name: "Test Tileset",
        type: "image/png",
        imageId: id,
      })
    );
    dispatch(setTileWidth(64));
    dispatch(setTileHeight(64));
  }
  if (!hasUploadedImage) {
    addTest();
    return null;
  }

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
      {hasUploadedImage ? (
        <>
          <InputForm />
          <OutputForm />
        </>
      ) : (
        <DropZone onFileDrop={onFile} />
      )}
    </main>
  );
}
