import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";
import { classnames } from "../utils/classnames";

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={classnames(styles.button, className)} {...props} />;
}
