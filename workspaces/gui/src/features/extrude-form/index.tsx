import InputForm from "./input-form/";
import OutputForm from "./output-form/";
import CanvasInputPreview from "./input-form/canvas-input-preview";
import CanvasExtrusion from "./output-form/canvas-extrusion";
import { useAppDispatch } from "../../store/hooks";
import { clearInputImage } from "../../store/extruder-slice";
import css from "./index.module.scss";

function ExtrudeForm() {
  const dispatch = useAppDispatch();

  return (
    <div>
      <button onClick={() => dispatch(clearInputImage())}>Back</button>
      <h2>Extrusion Preview</h2>
      <CanvasInputPreview />
      <CanvasExtrusion />
      <h2>Input Settings</h2>
      <InputForm />
      <h2>Output Settings</h2>
      <OutputForm />
    </div>
  );
}

export default ExtrudeForm;
