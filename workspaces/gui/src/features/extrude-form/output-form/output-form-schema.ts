import * as yup from "yup";

const outputFormSchema = yup.object().shape({
  backgroundColor: yup
    .string()
    .required("Background color is required.")
    .typeError("Background color is required."),
  extrudeAmount: yup
    .number()
    .integer("Extrude amount needs to be a whole number.")
    .min(0, "Extrude amount needs to be >= 0.")
    .required("Extrude amount needs to be a number.")
    .typeError("Extrude amount needs to be a number."),
  outputFilename: yup
    .string()
    .required("Output filename is required.")
    .typeError("Output filename is required."),
  optimizeOutput: yup
    .boolean()
    .required("Optimize output setting is required.")
    .typeError("Optimize output setting is required."),
});

export default outputFormSchema;
