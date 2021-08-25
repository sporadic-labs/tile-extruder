import { configureStore } from "@reduxjs/toolkit";
import extruderSlice from "./extruder-slice";
import ImageStorage from "./image-storage/image-storage";
import visualizationSlice from "./visualization-slice";

const imageStorage = new ImageStorage();

const store = configureStore({
  reducer: {
    extruder: extruderSlice,
    visualization: visualizationSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: imageStorage,
      },
    });
  },
});

export { store, imageStorage };
export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
