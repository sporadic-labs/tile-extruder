import { ReactNode } from "react";
import NextLink from "next/link";
import styles from "./Link.module.css";
import { classnames } from "../utils/classnames";

type LinkProps = React.ComponentProps<typeof NextLink> & {
  children: ReactNode;
  color?: "gray" | "blue";
};

export function Link({ children, color = "blue", ...props }: LinkProps) {
  return (
    <NextLink
      {...props}
      className={classnames(
        styles.link,
        color === "blue" ? styles.blue : styles.gray,
        props.className
      )}
    >
      {children}
    </NextLink>
  );
}
