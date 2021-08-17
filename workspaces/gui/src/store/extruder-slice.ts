import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExtruderState {
  width: number;
  height: number;
}

const initialState: ExtruderState = {
  width: 0,
  height: 0,
};

const extruderSlice = createSlice({
  name: "extruder",
  initialState,
  reducers: {
    setSize: (state, action: PayloadAction<{ width: number; height: number }>) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
  },
});

export default extruderSlice.reducer;
export const { setSize } = extruderSlice.actions;
export { extruderSlice };
export type { ExtruderState };
