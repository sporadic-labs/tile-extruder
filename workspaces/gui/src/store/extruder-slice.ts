import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageId } from "../image-storage/image-storage";

interface ExtruderState {
  width: number;
  height: number;
  name: string;
  type: string;
  imageStorageId: ImageId | null;
}

const initialState: ExtruderState = {
  width: 0,
  height: 0,
  name: "",
  type: "",
  imageStorageId: null,
};

interface InputImagePayload {
  width: number;
  height: number;
  name: string;
  type: string;
  imageId: ImageId;
}

const extruderSlice = createSlice({
  name: "extruder",
  initialState,
  reducers: {
    clearInputImage: (state) => {
      state.width = 0;
      state.height = 0;
      state.name = "";
      state.type = "";
      state.imageStorageId = null;
    },
    setInputImage: (state, action: PayloadAction<InputImagePayload>) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
      state.name = action.payload.name;
      state.type = action.payload.type;
      state.imageStorageId = action.payload.imageId;
    },
  },
});

export default extruderSlice.reducer;
export const { setInputImage, clearInputImage } = extruderSlice.actions;
export { extruderSlice };
export type { ExtruderState, InputImagePayload };
