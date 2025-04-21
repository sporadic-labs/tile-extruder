import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormValues } from "./ExtruderForm";
import { Button, OverlayArrow, Tooltip, TooltipTrigger } from "react-aria-components";
import { MdInfoOutline } from "react-icons/md";
import { ReactNode } from "react";

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
        {tooltip && (
          <TooltipTrigger delay={100}>
            <Button className="text-gray-700 hover:text-gray-900">
              <MdInfoOutline className="h-4 w-4" />
            </Button>
            <Tooltip className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-xs">
              <OverlayArrow>
                <svg width={8} height={8} viewBox="0 0 8 8">
                  <path d="M0 0 L4 4 L8 0" fill="white" />
                </svg>
              </OverlayArrow>
              {tooltip}
            </Tooltip>
          </TooltipTrigger>
        )}
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
