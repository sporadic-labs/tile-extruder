"use client";

import ExtruderForm from "@/app/extrude/form/ExtruderForm";
import styles from "./page.module.css";

export default function ExtrudePage() {
  return (
    <main className={styles.main}>
      <ExtruderForm />
    </main>
  );
}
