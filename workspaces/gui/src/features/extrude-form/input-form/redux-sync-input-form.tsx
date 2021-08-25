import { useFormikContext } from "formik";
import { useEffect } from "react";
import { InputFormInputs } from ".";
import {
  setTileWidth,
  setTileHeight,
  setInputMargin,
  setInputSpacing,
} from "../../../store/extruder-slice";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import inputFormSchema from "./input-form-schema";

function ReduxSyncInputForm() {
  const extruderConfig = useAppSelector((state) => state.extruder);
  const dispatch = useAppDispatch();
  const { values } = useFormikContext<InputFormInputs>();

  useEffect(() => {
    const isValid = inputFormSchema.isValidSync(values);
    if (!isValid) {
      return;
    }

    const { tileWidth, tileHeight, margin, spacing } = values;

    if (tileWidth !== extruderConfig.tileWidth) {
      dispatch(setTileWidth(tileWidth));
    }
    if (tileHeight !== extruderConfig.tileHeight) {
      dispatch(setTileHeight(tileHeight));
    }
    if (margin !== extruderConfig.inputMargin) {
      dispatch(setInputMargin(margin));
    }
    if (spacing !== extruderConfig.inputSpacing) {
      dispatch(setInputSpacing(spacing));
    }
  }, [values, dispatch, extruderConfig]);

  return null;
}

export default ReduxSyncInputForm;
