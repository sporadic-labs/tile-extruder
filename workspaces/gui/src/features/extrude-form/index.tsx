import InputForm from "./input-form";
import OutputForm from "./output-form";
import css from "./index.module.scss";

function ExtrudeForm() {
  return (
    <div className={css.grid}>
      <InputForm />
      <OutputForm />
    </div>
  );
}

export default ExtrudeForm;
