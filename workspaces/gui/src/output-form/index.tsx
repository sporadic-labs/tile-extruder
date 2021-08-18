import { ChangeEventHandler } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import CanvasExtrusion from "./canvas-extrusion";

function OutputForm() {
  const extruderConfig = useAppSelector((state) => state.extruder);
  const dispatch = useAppDispatch();

  if (!extruderConfig.imageStorageId) return null;

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);
    // TODO: input validation
    if (!Number.isNaN(parsedValue)) {
      // TODO.
    }
  };

  return (
    <>
      <h2>Extruded Image</h2>
      <CanvasExtrusion />
      <form></form>
    </>
  );
}

export default OutputForm;
