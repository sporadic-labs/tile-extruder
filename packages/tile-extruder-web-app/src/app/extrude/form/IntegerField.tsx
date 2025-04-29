import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormValues } from "./ExtruderForm";
import { ReactNode } from "react";
import { InfoTooltip } from "./InfoTooltip";
import styles from "./IntegerField.module.css";

interface IntegerFieldProps {
  name: keyof FormValues;
  label: string;
  min: number;
  max: number;
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
  tooltip?: ReactNode;
}

export function IntegerField({
  name,
  label,
  min,
  max,
  register,
  errors,
  tooltip,
}: IntegerFieldProps) {
  return (
    <div>
      <div className={styles.field}>
        <label className={styles.label}>{label}</label>
        {tooltip ? <InfoTooltip>{tooltip}</InfoTooltip> : null}
      </div>
      <input
        type="number"
        {...register(name, {
          valueAsNumber: true,
          required: `${label} is required`,
          min: { value: min, message: `${label} must be at least ${min}` },
          max: { value: max, message: `${label} must be at most ${max}` },
          validate: (value) => Number.isInteger(value) || `${label} must be an integer`,
        })}
        className={`${styles.input} ${errors[name] ? styles.inputError : ""}`}
      />
      {errors[name] && <p className={styles.error}>{errors[name]?.message}</p>}
    </div>
  );
}
