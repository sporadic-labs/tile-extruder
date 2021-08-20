import { createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import ImageStorage, { ImageId } from "./image-storage";

interface ThunkConfig {
  extra: ImageStorage;
  state: RootState;
}

interface SetImageFromFileReturn {
  id: ImageId;
  name: string;
  type: string;
  width: number;
  height: number;
}

const setImageFromFile = createAsyncThunk<SetImageFromFileReturn, File, ThunkConfig>(
  "setImageFromFile",
  async (file, thunkApi) => {
    const imageStorage = thunkApi.extra;
    imageStorage.clear(); // TODO: only clear old image when a new one is added.
    const { name, type } = file;
    const [id, data] = await imageStorage.addFromFile(file);
    const { width, height } = data;
    return { id, name, type, width, height };
  }
);

export { setImageFromFile };
export type { SetImageFromFileReturn, ThunkConfig };
