import { useEffect, useRef } from "react";
import { useImageStorage } from "../image-storage/react-integration";
import { useAppSelector } from "../store/hooks";
import css from "./canvas-extrusion.module.scss";

function CanvasExtrusion() {
  const extruderConfig = useAppSelector((state) => state.extruder);
  const imageStorage = useImageStorage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // It's okay to assume image is present - handled by parent.
  const imageData = imageStorage.get(extruderConfig.imageStorageId!)!;

  const { width, height, tileWidth, tileHeight, inputSpacing, inputMargin } = extruderConfig;

  // Solve for "cols" & "rows" to get the formulae used here:
  //  width = 2 * inputMargin + (cols - 1) * spacing + cols * tileWidth
  //  height = 2 * inputMargin + (rows - 1) * spacing + rows * tileHeight
  const cols = (width - 2 * inputMargin + inputSpacing) / (tileWidth + inputSpacing);
  const rows = (height - 2 * inputMargin + inputSpacing) / (tileHeight + inputSpacing);

  // Same calculation but in reverse & inflating the tile size by the extrusion amount
  const extrudeAmount = 1;
  const newWidth =
    2 * inputMargin + (cols - 1) * inputSpacing + cols * (tileWidth + 2 * extrudeAmount);
  const newHeight =
    2 * inputMargin + (rows - 1) * inputSpacing + rows * (tileHeight + 2 * extrudeAmount);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) {
      return;
    }

    // ctx.scale(3, 3);

    const copyPixels = (sx: number, sy: number, sw: number, sh: number, dx: number, dy: number) => {
      ctx.drawImage(imageData.image, sx, sy, sw, sh, dx, dy, sw, sh);
    };

    const extrude = (sx: number, sy: number, sw: number, sh: number, dx: number, dy: number) => {};

    ctx.clearRect(0, 0, newWidth, newHeight);

    // TODO: background color here.
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, newWidth, newHeight);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let sx = inputMargin + col * (tileWidth + inputSpacing); // x of tile top left
        let sy = inputMargin + row * (tileHeight + inputSpacing); // y of tile top left
        let dx = inputMargin + col * (tileWidth + inputSpacing + 2 * extrudeAmount); // x of the extruded tile top left: ;
        let dy = inputMargin + row * (tileHeight + inputSpacing + 2 * extrudeAmount); // y of the extruded tile top left
        const tw = tileWidth;
        const th = tileHeight;
        const e = extrudeAmount;

        // Copy the tile.
        copyPixels(sx, sy, tw, th, dx, dy);

        // Extrude the top row.
        // copyPixels(sx, sy, tw, 1, dx + e, dy - e);

        // Extrude the bottom row.
        // copyPixels(sx, sy + th - 1, tw, 1, dx + e, dy + e + th - 1);

        // Extrude the left column.
        // copyPixels(sx, sy, 1, th, dx + e, dy + e);

        // Extrude the right column.
        // copyPixels(sx + tw - 1, sy, 1, th, dx + e + tw - 1, dy + e);

        // Extrude the top left corner.
        // copyPixels(sx, sy, 1, 1, dx - e, dy - e);

        // Extrude the top right corner.
        //   copyPixelToRect(
        //     image,
        //     srcX + tw - 1,
        //     srcY,
        //     extrudedImage,
        //     destX + extrusion + tw,
        //     destY,
        //     extrusion,
        //     extrusion
        //   );

        // Extrude the bottom left corner.
        //   copyPixelToRect(
        //     image,
        //     srcX,
        //     srcY + th - 1,
        //     extrudedImage,
        //     destX,
        //     destY + extrusion + th,
        //     extrusion,
        //     extrusion
        //   );

        // Extrude the bottom right corner.
        //   copyPixelToRect(
        //     image,
        //     srcX + tw - 1,
        //     srcY + th - 1,
        //     extrudedImage,
        //     destX + extrusion + tw,
        //     destY + extrusion + th,
        //     extrusion,
        //     extrusion
        //   );
        // }
      }
    }
    ctx.resetTransform();
  }, [
    imageData,
    cols,
    rows,
    newWidth,
    newHeight,
    tileWidth,
    tileHeight,
    inputSpacing,
    inputMargin,
  ]);

  return (
    <div className={css.canvasWrapper}>
      <canvas ref={canvasRef} width={newWidth} height={newHeight}></canvas>
    </div>
  );
}

export default CanvasExtrusion;
