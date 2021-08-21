import InputForm from "./input-form/";
import OutputForm from "./output-form/";
import css from "./index.module.scss";
import CanvasInputPreview from "./input-form/canvas-input-preview";
import CanvasExtrusion from "./output-form/canvas-extrusion";

function ExtrudeForm() {
  return (
    <div>
      <h2>Extrusion Preview</h2>
      <CanvasInputPreview />
      <CanvasExtrusion />
      <h2>Input Settings</h2>
      <InputForm />
      <h2>Output Settings</h2>
      <OutputForm />
      <button>Download</button>
    </div>
  );
}

export default ExtrudeForm;
