import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";
import { RootState, AppDispatch } from "./index";

export const useAppStore = () => useStore<RootState>();
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
