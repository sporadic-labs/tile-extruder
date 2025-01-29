"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { extrudeBufferTilesetToJimp } from "tile-extruder";
import { useEffect } from "react";

export default function Home() {
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Read the file as ArrayBuffer
    const buffer = await file.arrayBuffer();

    // Process the image using tile-extruder
    extrudeBufferTilesetToJimp(16, 16, buffer, {
      margin: 0,
      spacing: 0,
      color: 0xffffff00,
      extrusion: 10,
    })
      .then(async (jimpImage) => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const imageData = new ImageData(
          new Uint8ClampedArray(jimpImage.bitmap.data),
          jimpImage.bitmap.width,
          jimpImage.bitmap.height
        );

        canvas.width = jimpImage.bitmap.width;
        canvas.height = jimpImage.bitmap.height;

        ctx.putImageData(imageData, 0, 0);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <main className={styles.main}>
      <h1>Tile Extruder</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className={styles.fileInput}
      />
      <canvas id="canvas" width={100} height={100}></canvas>
    </main>
  );
}
