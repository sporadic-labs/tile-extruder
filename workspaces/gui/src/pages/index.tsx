import DropZone from "../features/file-drop-zone";
import { useImageStorage } from "../store/image-storage/react-integration";
import ExtrudeForm from "../features/extrude-form";
import { setInputImage, setTileHeight, setTileWidth } from "../store/extruder-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import testTileset from "../assets/tilesets/test-tileset.png";
import useTestTileset from "../utils/use-test-tileset";

export default function Home() {
  const imageStorageId = useAppSelector((state) => state.extruder.imageStorageId);
  const dispatch = useAppDispatch();
  const imageStorage = useImageStorage();
  useTestTileset(testTileset.src, 64, 64);

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
      {hasUploadedImage ? <ExtrudeForm /> : <DropZone onFileDrop={onFile} />}
    </main>
  );
}
