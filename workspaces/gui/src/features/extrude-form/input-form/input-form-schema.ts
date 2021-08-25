import * as yup from "yup";

const inputFormSchema = yup.object().shape({
  tileWidth: yup
    .number()
    .integer("Tile width needs to be a whole number.")
    .min(1, "Tile width needs to be >= 1.")
    .required("Tile width needs to be a number.")
    .typeError("Tile width needs to be a number."),
  tileHeight: yup
    .number()
    .integer("Tile height needs to be a whole number.")
    .min(1, "Tile height needs to be >= 1.")
    .required("Tile height needs to be a number.")
    .typeError("Tile height needs to be a number."),
  margin: yup
    .number()
    .integer("Margin needs to be a whole number.")
    .min(0, "Margin needs to be >= 0.")
    .required("Margin needs to be a number.")
    .typeError("Margin needs to be a number."),
  spacing: yup
    .number()
    .integer("Spacing needs to be a whole number.")
    .min(0, "Spacing needs to be >= 0.")
    .required("Spacing needs to be a number.")
    .typeError("Spacing needs to be a number."),
});

export default inputFormSchema;
