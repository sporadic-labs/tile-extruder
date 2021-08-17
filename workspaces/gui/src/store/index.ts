import { configureStore } from "@reduxjs/toolkit";
import extruderSliceReducer from "./extruder-slice";

const store = configureStore({
  reducer: {
    extruder: extruderSliceReducer,
  },
});

export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
