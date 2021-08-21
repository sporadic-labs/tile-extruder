import { useAppSelector } from "../../../store/hooks";
import { Formik, Form } from "formik";
import CanvasInputPreview from "./canvas-input-preview";
import inputFormSchema from "./input-form-schema";
import ReduxSyncInputForm from "./redux-sync-input-form";
import { LabeledField } from "../form-elements";
import css from "./index.module.scss";

interface InputFormInputs {
  tileWidth: number;
  tileHeight: number;
  margin: number;
  spacing: number;
  showTilePreview: boolean;
}

function InputForm() {
  const extruderConfig = useAppSelector((state) => state.extruder);

  const initialValues: InputFormInputs = {
    tileWidth: extruderConfig.tileWidth,
    tileHeight: extruderConfig.tileHeight,
    margin: extruderConfig.inputMargin,
    spacing: extruderConfig.inputSpacing,
    showTilePreview: extruderConfig.showTilePreview,
  };

  if (!extruderConfig.imageStorageId) return null;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={inputFormSchema}
      validateOnChange
      onSubmit={(values) => {
        console.log(JSON.stringify(values, null, 2));
      }}
    >
      {(formik) => {
        return (
          <Form>
            <LabeledField name="tileWidth" label="Tile Width" type="number" />
            <LabeledField name="tileHeight" label="Tile Height" type="number" />
            <LabeledField name="margin" label="Margin" type="number" />
            <LabeledField name="spacing" label="Spacing" type="number" />
            <LabeledField name="showTilePreview" label="Show Preview" type="checkbox" />
            <ReduxSyncInputForm />
          </Form>
        );
      }}
    </Formik>
  );
}

export default InputForm;
export type { InputFormInputs };
