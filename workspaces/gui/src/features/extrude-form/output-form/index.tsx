import React from "react";
import { Formik, Form } from "formik";
import { useAppSelector } from "../../../store/hooks";
import { LabeledField, LabeledSelect } from "../form-elements";
import outputFormSchema from "./output-form-schema";
import ReduxSyncOutputForm from "./redux-sync-output-form";
import { canvasToBlob } from "../../../utils/canvas-blob";
import { getExtensionFromMimeType, ImageMimeType } from "../../../utils/image-filename-utils";
import { saveAs } from "file-saver";

interface OutputFormValues {
  backgroundColor: string;
  extrudeAmount: number;
  optimizeOutput: boolean;
  outputFilename: string;
  outputFileType: ImageMimeType;
}

function OutputForm() {
  const extruderConfig = useAppSelector((state) => state.extruder);

  const initialValues: OutputFormValues = {
    backgroundColor: extruderConfig.backgroundColor,
    extrudeAmount: extruderConfig.extrudeAmount,
    outputFilename: extruderConfig.outputFilename,
    optimizeOutput: extruderConfig.optimizeOutput,
    outputFileType: extruderConfig.outputFileType,
  };

  const fileTypeOptions = extruderConfig.supportedExportTypes.map((type) => {
    const [_, name] = type.split("/");
    return { label: name, value: type };
  });

  if (!extruderConfig.imageStorageId) return null;

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={outputFormSchema}
        validateOnChange
        onSubmit={(values) => {
          console.log(JSON.stringify(values, null, 2));
        }}
      >
        {(formik) => {
          return (
            <Form>
              <LabeledField name="extrudeAmount" label="Amount to Extrude" type="number" />
              <LabeledField name="backgroundColor" label="Background Color" type="string" />
              <LabeledField name="outputFilename" label="Output Filename" type="string" />
              <LabeledSelect
                name="outputFileType"
                label="Output File Type"
                options={fileTypeOptions}
              />
              <LabeledField name="optimizeOutput" label="Should optimize image?" type="checkbox" />
              <ReduxSyncOutputForm />
            </Form>
          );
        }}
      </Formik>
      <button
        onClick={async () => {
          // TODO: improve this with a ref, or special ID.
          const canvases = document.querySelectorAll("canvas");
          const target = canvases[canvases.length - 1];

          const ext = getExtensionFromMimeType(extruderConfig.outputFileType);
          const filename = `${extruderConfig.outputFilename}${ext}`;
          const blob = await canvasToBlob(target, extruderConfig.outputFileType);
          saveAs(blob, filename);
        }}
      >
        Download
      </button>
    </>
  );
}

export default OutputForm;
export type { OutputFormValues };
