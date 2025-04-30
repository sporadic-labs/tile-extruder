"use client";

import { useRouter } from "next/navigation";
import { useTilesetImage } from "@/app/extrude/form/TilesetImageProvider";
import ImageDropZone from "./components/ImageDropZone";
import styles from "./page.module.css";
import { Link } from "./components/Link";
import { MdOutlineImage } from "react-icons/md";

export default function Home() {
  const router = useRouter();
  const { setImageFile } = useTilesetImage();

  const handleImageDrop = (files: File[]) => {
    if (files.length > 0) {
      setImageFile(files[0]);
      router.push("/extrude");
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <h1 className={styles.title}>Tile Extruder</h1>
        <p className={styles.description}>
          Upload your tileset image and adjust the settings to create an extruded version that
          prevents rendering artifacts in game engines. Learn more <Link href="/info">here</Link>.
        </p>
      </div>

      <ImageDropZone onDrop={handleImageDrop} className={styles.dropzone}>
        <div className={styles.dropzoneContent}>
          <MdOutlineImage size={32} />
          <div className={styles.dropzoneText}>
            Drag and drop your tileset image here, or click to select a file
          </div>
        </div>
      </ImageDropZone>
    </main>
  );
}
