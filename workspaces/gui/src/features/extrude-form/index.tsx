import InputForm from "./input-form/";
import OutputForm from "./output-form/";
import { useAppDispatch } from "../../store/hooks";
import { clearInputImage } from "../../store/extruder-slice";
import CanvasInputPreview from "./canvas-input-preview/dynamic-canvas-input-preview";
import CanvasExtrudePreview from "./canvas-extrude-preview/dynamic-canvas-extrude-preview";
import css from "./index.module.scss";

function ExtrudeForm() {
  const dispatch = useAppDispatch();

  return (
    <div>
      <button onClick={() => dispatch(clearInputImage())}>Back</button>
      <h2>Extrusion Preview</h2>
      <div className={css.grid}>
        <CanvasInputPreview />
        <CanvasExtrudePreview />
      </div>
      <h2>Input Settings</h2>
      <InputForm />
      <h2>Output Settings</h2>
      <OutputForm />
    </div>
  );
}

export default ExtrudeForm;
