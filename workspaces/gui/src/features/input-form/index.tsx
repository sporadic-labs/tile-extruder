import { ChangeEventHandler } from "react";
import {
  setInputMargin,
  setInputSpacing,
  setTileHeight,
  setTileWidth,
} from "../../store/extruder-slice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import CanvasInputPreview from "./canvas-input-preview";
import css from "./index.module.scss";

function InputForm() {
  const extruderConfig = useAppSelector((state) => state.extruder);
  const dispatch = useAppDispatch();

  if (!extruderConfig.imageStorageId) return null;

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);
    // TODO: input validation
    if (!Number.isNaN(parsedValue)) {
      switch (key) {
        case "tileWidth":
          dispatch(setTileWidth(parsedValue));
          break;
        case "tileHeight":
          dispatch(setTileHeight(parsedValue));
          break;
        case "margin":
          dispatch(setInputMargin(parsedValue));
          break;
        case "spacing":
          dispatch(setInputSpacing(parsedValue));
          break;
        default:
          console.error(`Unknown input name ${key}.`);
          break;
      }
    }
  };

  return (
    <>
      <h2>Original Image</h2>
      <CanvasInputPreview />
      <form className={css.form}>
        <div>
          <label htmlFor="tileWidth">Tile Width:</label>
          <input
            type="number"
            id="tileWidth"
            name="tileWidth"
            value={extruderConfig.tileWidth}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="tileHeight">Tile Height:</label>
          <input
            type="number"
            id="tileHeight"
            name="tileHeight"
            value={extruderConfig.tileHeight}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="margin">Margin:</label>
          <input
            type="number"
            id="margin"
            name="margin"
            value={extruderConfig.inputMargin}
            onChange={onChange}
          />
        </div>
        <div>
          <label htmlFor="spacing">Spacing:</label>
          <input
            type="number"
            id="spacing"
            name="spacing"
            value={extruderConfig.inputSpacing}
            onChange={onChange}
          />
        </div>
      </form>
    </>
  );
}

export default InputForm;
