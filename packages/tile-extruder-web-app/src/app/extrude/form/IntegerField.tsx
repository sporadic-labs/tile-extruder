import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormValues } from "./ExtruderForm";
import { ReactNode } from "react";
import { InfoTooltip } from "./InfoTooltip";

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
      <div className="flex items-center gap-1 mb-1">
        <label className="text-sm font-medium text-gray-900">{label}</label>
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
        className={`w-full px-3 py-2 border ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
      />
      {errors[name] && <p className="mt-1 text-sm text-red-600">{errors[name]?.message}</p>}
    </div>
  );
}
