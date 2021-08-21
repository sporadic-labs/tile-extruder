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

interface LabeledSelectProps extends ComponentPropsWithoutRef<"select"> {
  label: string;
  name: string;
  options: Array<{ label: string; value: string }>;
}

function LabeledSelect({ label, name, options, ...props }: LabeledSelectProps) {
  return (
    <div>
      <label>{label}</label>
      <Field name={name} {...props} as="select">
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} />
    </div>
  );
}

export { LabeledField, LabeledSelect };
export type { LabeledFieldProps, LabeledSelectProps };
