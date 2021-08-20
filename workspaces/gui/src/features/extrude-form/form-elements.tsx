import { Field, ErrorMessage } from "formik";
import React, { ComponentPropsWithoutRef } from "react";

interface LabeledFieldProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  name: string;
}

function LabeledField({ label, name, ...props }: LabeledFieldProps) {
  return (
    <div>
      <label>{label}</label>
      <Field name={name} {...props} />
      <ErrorMessage name={name} />
    </div>
  );
}

export { LabeledField };
export type { LabeledFieldProps };
