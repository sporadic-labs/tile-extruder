import { configureStore } from "@reduxjs/toolkit";
import extruderSliceReducer from "./extruder-slice";
import ImageStorage from "./image-storage/image-storage";

const imageStorage = new ImageStorage();

const store = configureStore({
  reducer: {
    extruder: extruderSliceReducer,
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
