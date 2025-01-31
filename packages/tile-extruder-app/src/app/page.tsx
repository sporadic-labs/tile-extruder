"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { extrudeBufferTilesetToJimp } from "../../../tile-extruder/bin";
import { useEffect, useState } from "react";
import { WorkerResultEvent, WorkerStartEvent } from "./worker";

type State =
  | { type: "waitingForUpload" }
  | {
      type: "loading";
      imageFile: File;
    }
  | { type: "success"; imageFile: File; imageData: ImageData }
  | { type: "error"; error: string };

export default function Home() {
  const [state, setState] = useState<State>({
    type: "waitingForUpload",
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (!imageFile) {
      setState({ type: "error", error: "Please select a valid image file." });
      return;
    }

    setState({ type: "loading", imageFile });

    const worker = new Worker(new URL("./worker.ts", import.meta.url));

    worker.onmessage = (e: MessageEvent<WorkerResultEvent>) => {
      if (e.data.type === "success") {
        const { data, width, height } = e.data;
        const imageData = new ImageData(new Uint8ClampedArray(data), width, height);
        setState({ type: "success", imageFile, imageData });
      } else if (e.data.type === "error") {
        setState({ type: "error", error: e.data.error });
      }
      worker.terminate();
    };

    // Read the file as ArrayBuffer
    const buffer = await imageFile.arrayBuffer();

    // Send data to worker
    worker.postMessage({
      buffer,
      tileWidth: 16,
      tileHeight: 16,
      options: {
        margin: 0,
        spacing: 0,
        color: 0xffffff00,
        extrusion: 10,
      },
    } as WorkerStartEvent);
  };

  useEffect(() => {
    if (state.type !== "success") return;

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = state.imageData.width;
    canvas.height = state.imageData.height;

    ctx.putImageData(state.imageData, 0, 0);
  }, [state]);

  const handleDownload = () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) return;

    // Create a temporary link element
    const link = document.createElement("a");
    link.download = "extruded-tileset.png"; // Default filename
    link.href = canvas.toDataURL("image/png");

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
      {state.type === "loading" ? <p>loading...</p> : null}
      {state.type === "error" ? <p>Error: {state.error}</p> : null}
      {state.type === "success" ? (
        <div>
          <button onClick={handleDownload} className={styles.downloadButton}>
            Download Image
          </button>
          <canvas id="canvas" width={100} height={100}></canvas>
        </div>
      ) : null}
    </main>
  );
}
