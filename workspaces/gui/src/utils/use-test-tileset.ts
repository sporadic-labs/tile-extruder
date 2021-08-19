import { setInputImage, setTileWidth, setTileHeight } from "../store/extruder-slice";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { useImageStorage } from "../store/image-storage/react-integration";
import testTileset from "../assets/tilesets/test-tileset.png";
import { useEffect } from "react";

export default function useTestTileset(imagePath: string, tileWidth: number, tileHeight: number) {
  const dispatch = useAppDispatch();
  const imageStorage = useImageStorage();

  useEffect(() => {
    async function addTest() {
      const [id, data] = await imageStorage.addFromPath(imagePath);
      dispatch(
        setInputImage({
          width: data.width,
          height: data.height,
          name: "Test Tileset",
          type: "image/png",
          imageId: id,
        })
      );
      dispatch(setTileWidth(tileWidth));
      dispatch(setTileHeight(tileHeight));
    }
    addTest();
  }, []);
}
