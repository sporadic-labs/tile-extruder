import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Position {
  x: number;
  y: number;
}

interface VisualizationState {
  position: Position;
  zoom: number;
  showTilePreview: boolean;
}

const initialState: VisualizationState = {
  position: { x: 0, y: 0 },
  zoom: 1,
  showTilePreview: true,
};

const visualizationSlice = createSlice({
  name: "visualization",
  initialState,
  reducers: {
    setShowTilePreview: (state, action: PayloadAction<boolean>) => {
      state.showTilePreview = action.payload;
    },
    setZoom: (state, action: PayloadAction<number>) => {
      state.zoom = action.payload;
    },
    setPosition: (state, action: PayloadAction<Position>) => {
      state.position.x = action.payload.x;
      state.position.y = action.payload.y;
    },
  },
});

export default visualizationSlice.reducer;
export const { setShowTilePreview, setZoom, setPosition } = visualizationSlice.actions;
export { visualizationSlice };
export type { VisualizationState, Position };
