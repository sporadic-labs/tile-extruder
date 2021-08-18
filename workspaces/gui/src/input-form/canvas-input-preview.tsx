import { useEffect, useRef } from "react";
import { useImageStorage } from "../image-storage/react-integration";
import { useAppSelector } from "../store/hooks";
import css from "./canvas-input-preview.module.scss";

function CanvasInputPreview() {
  const extruderConfig = useAppSelector((state) => state.extruder);
  const imageStorage = useImageStorage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // It's okay to assume image is present - handled by parent.
  const imageData = imageStorage.get(extruderConfig.imageStorageId!)!;
  const { width, height, tileWidth, tileHeight, inputSpacing, inputMargin } = extruderConfig;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // TODO: background color here.
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    ctx.drawImage(imageData.image, 0, 0);

    // Tile outline settings. Translate to (0.5, 0.5) for stroke 1 and (0, 0) for stroke 2.
    ctx.translate(0, 0);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.75)";

    const xStep = tileWidth + inputSpacing;
    const yStep = tileHeight + inputSpacing;
    for (let x = inputMargin; x < width; x += xStep) {
      for (let y = inputMargin; y < height; y += yStep) {
        ctx.strokeRect(x, y, tileWidth, tileHeight);
      }
    }

    ctx.resetTransform();
  }, [imageData, width, height, tileWidth, tileHeight, inputSpacing, inputMargin]);

  return (
    <div className={css.canvasWrapper}>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </div>
  );
}

export default CanvasInputPreview;
