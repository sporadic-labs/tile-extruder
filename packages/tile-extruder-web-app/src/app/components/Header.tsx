import Image from "next/image";
import styles from "./Header.module.css";
import { FaGithub } from "react-icons/fa";
import { Link } from "./Link";
import { classnames } from "../utils/classnames";

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        <Image src="/logo.svg" alt="Tile Extruder Logo" width={28} height={28} />
        <span className={styles.logoText}>Tile Extruder</span>
      </Link>
      <div className={styles.navLinks}>
        <Link href="/info" className={styles.navLink}>
          Info
        </Link>
        <Link
          href="https://github.com/sporadic-labs/tile-extruder"
          target="_blank"
          rel="noopener noreferrer"
          className={classnames(styles.navLink, styles.navLinkGithub)}
        >
          <FaGithub size={"1.5rem"} />
        </Link>
      </div>
    </header>
  );
}
