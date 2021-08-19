import { useImageStorage } from "../../store/image-storage/react-integration";
import { useAppSelector } from "../../store/hooks";
import Canvas, { CanvasDrawFn } from "../../components/canvas";
import { copyPixels, sampleColor } from "./extrusion-utils";

function CanvasExtrusion() {
  const extruderConfig = useAppSelector((state) => state.extruder);
  const imageStorage = useImageStorage();

  // It's okay to assume image is present - handled by parent.
  const imageData = imageStorage.get(extruderConfig.imageStorageId!)!;
  const image = imageData.image;

  const { width, height, tileWidth, tileHeight, inputSpacing, inputMargin } = extruderConfig;

  // Solve for "cols" & "rows" to get the formulae used here:
  //  width = 2 * inputMargin + (cols - 1) * spacing + cols * tileWidth
  //  height = 2 * inputMargin + (rows - 1) * spacing + rows * tileHeight
  const cols = (width - 2 * inputMargin + inputSpacing) / (tileWidth + inputSpacing);
  const rows = (height - 2 * inputMargin + inputSpacing) / (tileHeight + inputSpacing);

  // Same calculation but in reverse & inflating the tile size by the extrusion amount
  const extrudeAmount = 3;
  const newWidth =
    2 * inputMargin + (cols - 1) * inputSpacing + cols * (tileWidth + 2 * extrudeAmount);
  const newHeight =
    2 * inputMargin + (rows - 1) * inputSpacing + rows * (tileHeight + 2 * extrudeAmount);

  const drawDependencies = [
    image,
    cols,
    rows,
    newWidth,
    newHeight,
    tileWidth,
    tileHeight,
    inputSpacing,
    inputMargin,
  ];

  const draw: CanvasDrawFn = (ctx) => {
    ctx.scale(3, 3);

    ctx.clearRect(0, 0, newWidth, newHeight);

    // TODO: background color here.
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, newWidth, newHeight);

    const copy = copyPixels.bind(null, ctx, image);
    console.log("draw");

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        console.log({ row, col });
        const tw = tileWidth;
        const th = tileHeight;
        const e = extrudeAmount;

        // sx and sy are the top left of the tile's position in the original image:
        let sx = inputMargin + col * (tw + inputSpacing);
        let sy = inputMargin + row * (th + inputSpacing);

        // dx and dy are the top left of the tile's position in the extruded output:
        let dx = inputMargin + col * (tw + inputSpacing + 2 * e) + e;
        let dy = inputMargin + row * (th + inputSpacing + 2 * e) + e;

        // Copy the tile.
        copy(sx, sy, tw, th, dx, dy);

        // Extrude the edges.
        for (let eStep = 1; eStep <= e; eStep++) {
          copy(sx, sy, tw, 1, dx, dy - eStep); // Top
          copy(sx, sy + th - 1, tw, 1, dx, dy + th - 1 + eStep); // Bottom
          copy(sx, sy, 1, th, dx - eStep, dy); // Left
          copy(sx + tw - 1, sy, 1, th, dx + tw - 1 + eStep, dy); // Right
        }

        // Extrude the corners.
        const topLeft = sampleColor(image, sx, sy);
        const topRight = sampleColor(image, sx + tw - 1, sy);
        const bottomRight = sampleColor(image, sx + tw - 1, sy + th - 1);
        const bottomLeft = sampleColor(image, sx, sy + th - 1);
        ctx.fillStyle = topLeft;
        ctx.fillRect(dx - e, dy - e, e, e);
        ctx.fillStyle = topRight;
        ctx.fillRect(dx + tw, dy - e, e, e);
        ctx.fillStyle = bottomRight;
        ctx.fillRect(dx + tw, dy + th, e, e);
        ctx.fillStyle = bottomLeft;
        ctx.fillRect(dx - e, dy + th, e, e);
      }
    }
    ctx.resetTransform();
  };

  return (
    <Canvas width={newWidth} height={newHeight} draw={draw} drawDependencies={drawDependencies} />
  );
}

export default CanvasExtrusion;
