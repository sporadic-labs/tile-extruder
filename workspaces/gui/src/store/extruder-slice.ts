import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImageId } from "./image-storage/image-storage";
import { setImageFromFile } from "./image-storage/image-storage-thunks";

type ImageState = "none" | "loading" | "success" | "error";

interface ExtruderState {
  width: number;
  height: number;
  name: string;
  type: string;
  imageStorageId: ImageId | null;
  imageState: ImageState;
  tileWidth: number;
  tileHeight: number;
  inputMargin: number;
  inputSpacing: number;
  showTilePreview: boolean;
  extrudeAmount: number;
  optimizeOutput: boolean;
  backgroundColor: string;
  outputFilename: string;
}

const initialState: ExtruderState = {
  width: 0,
  height: 0,
  name: "",
  type: "",
  imageStorageId: null,
  imageState: "none",
  tileWidth: 32,
  tileHeight: 32,
  inputMargin: 0,
  inputSpacing: 0,
  showTilePreview: false,
  extrudeAmount: 1,
  optimizeOutput: true,
  backgroundColor: "transparent",
  outputFilename: "",
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
      state.imageState = "none";
      state.imageStorageId = null;
    },
    setInputImage: (state, action: PayloadAction<InputImagePayload>) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
      state.name = action.payload.name;
      state.type = action.payload.type;
      state.imageStorageId = action.payload.imageId;
      state.outputFilename = action.payload.name || "output.png";
    },
    setInputMargin: (state, action: PayloadAction<number>) => {
      state.inputMargin = action.payload;
    },
    setInputSpacing: (state, action: PayloadAction<number>) => {
      state.inputSpacing = action.payload;
    },
    setTileWidth: (state, action: PayloadAction<number>) => {
      state.tileWidth = action.payload;
    },
    setTileHeight: (state, action: PayloadAction<number>) => {
      state.tileHeight = action.payload;
    },
    setShowTilePreview: (state, action: PayloadAction<boolean>) => {
      state.showTilePreview = action.payload;
    },
    setExtrudeAmount: (state, action: PayloadAction<number>) => {
      state.extrudeAmount = action.payload;
    },
    setOptimizeOutput: (state, action: PayloadAction<boolean>) => {
      state.optimizeOutput = action.payload;
    },
    setBackgroundColor: (state, action: PayloadAction<string>) => {
      state.backgroundColor = action.payload;
    },
    setOutputFilename: (state, action: PayloadAction<string>) => {
      state.outputFilename = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setImageFromFile.pending, (state, { payload }) => {
      clearInputImage();
      state.imageState = "loading";
    });
    builder.addCase(setImageFromFile.fulfilled, (state, { payload }) => {
      const { id, width, height, name, type } = payload;
      state.width = width;
      state.height = height;
      state.name = name;
      state.type = type;
      state.imageStorageId = id;
      state.outputFilename = state.name;
    });
    builder.addCase(setImageFromFile.rejected, (state, { payload }) => {
      clearInputImage();
      state.imageState = "error";
    });
  },
});

export default extruderSlice.reducer;
export const {
  setInputImage,
  clearInputImage,
  setInputMargin,
  setInputSpacing,
  setTileWidth,
  setTileHeight,
  setShowTilePreview,
  setExtrudeAmount,
  setOptimizeOutput,
  setBackgroundColor,
  setOutputFilename,
} = extruderSlice.actions;
export { setImageFromFile };
export { extruderSlice };
export type { ExtruderState, InputImagePayload };
