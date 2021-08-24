import { useFormikContext } from "formik";
import { useEffect } from "react";
import { OutputFormValues } from ".";
import {
  setTileWidth,
  setTileHeight,
  setInputMargin,
  setInputSpacing,
  setExtrudeAmount,
  setBackgroundColor,
  setOptimizeOutput,
  setOutputFilename,
  setOutputFileType,
} from "../../../store/extruder-slice";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import outputFormSchema from "./output-form-schema";

function ReduxSyncOutputForm() {
  const extruderConfig = useAppSelector((state) => state.extruder);
  const dispatch = useAppDispatch();
  const { values } = useFormikContext<OutputFormValues>();

  useEffect(() => {
    const isValid = outputFormSchema.isValidSync(values);
    if (!isValid) {
      return;
    }

    const { extrudeAmount, backgroundColor, optimizeOutput, outputFilename, outputFileType } =
      values;

    if (extrudeAmount !== extruderConfig.extrudeAmount) {
      dispatch(setExtrudeAmount(extrudeAmount));
    }
    if (backgroundColor !== extruderConfig.backgroundColor) {
      dispatch(setBackgroundColor(backgroundColor));
    }
    if (optimizeOutput !== extruderConfig.optimizeOutput) {
      dispatch(setOptimizeOutput(optimizeOutput));
    }
    if (outputFilename !== extruderConfig.outputFilename) {
      dispatch(setOutputFilename(outputFilename));
    }
    if (outputFileType !== extruderConfig.outputFileType) {
      dispatch(setOutputFileType(outputFileType));
    }
  }, [values, dispatch, extruderConfig]);

  return null;
}

export default ReduxSyncOutputForm;
