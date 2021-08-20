import { setTileWidth, setTileHeight, setImageFromFile } from "../store/extruder-slice";
import { useAppDispatch } from "../store/hooks";
import { useEffect } from "react";

export default function useTestTileset(imagePath: string, tileWidth: number, tileHeight: number) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function addTest() {
      const res = await fetch(imagePath);
      const blob = await res.blob();
      const file = new File([blob], imagePath);
      dispatch(setImageFromFile(file));
      dispatch(setTileWidth(tileWidth));
      dispatch(setTileHeight(tileHeight));
    }
    addTest();
  }, [dispatch, imagePath, tileWidth, tileHeight]);
}
