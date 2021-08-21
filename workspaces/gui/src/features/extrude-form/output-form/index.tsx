import React from "react";
import { Formik, Form } from "formik";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { LabeledField } from "../form-elements";
import outputFormSchema from "./output-form-schema";
import ReduxSyncOutputForm from "./redux-sync-output-form";

interface OutputFormValues {
  backgroundColor: string;
  extrudeAmount: number;
  optimizeOutput: boolean;
  outputFilename: string;
}

function OutputForm() {
  const extruderConfig = useAppSelector((state) => state.extruder);

  const initialValues: OutputFormValues = {
    backgroundColor: extruderConfig.backgroundColor,
    extrudeAmount: extruderConfig.extrudeAmount,
    outputFilename: extruderConfig.outputFilename,
    optimizeOutput: extruderConfig.optimizeOutput,
  };

  if (!extruderConfig.imageStorageId) return null;

  return (
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
            <LabeledField name="optimizeOutput" label="Should optimize image?" type="checkbox" />
            <ReduxSyncOutputForm />
          </Form>
        );
      }}
    </Formik>
  );
}

export default OutputForm;
export type { OutputFormValues };
