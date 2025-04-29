import { ReactNode } from "react";
import NextLink from "next/link";
import styles from "./Link.module.css";
import { classnames } from "../utils/classnames";

export function Link({
  children,
  ...props
}: React.ComponentProps<typeof NextLink> & { children: ReactNode }) {
  return (
    <NextLink {...props} className={classnames(styles.link, props.className)}>
      {children}
    </NextLink>
  );
}
