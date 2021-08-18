import { useImageStorage } from "../../store/image-storage/react-integration";
import { useAppSelector } from "../../store/hooks";
import Canvas, { CanvasDrawFn } from "../../components/canvas";

function CanvasInputPreview() {
  const extruderConfig = useAppSelector((state) => state.extruder);
  const imageStorage = useImageStorage();

  // It's okay to assume image is present - handled by parent.
  const imageData = imageStorage.get(extruderConfig.imageStorageId!)!;
  const { width, height, tileWidth, tileHeight, inputSpacing, inputMargin } = extruderConfig;

  const drawDependencies = [
    imageData,
    width,
    height,
    tileWidth,
    tileHeight,
    inputSpacing,
    inputMargin,
  ];

  const draw: CanvasDrawFn = (ctx) => {
    ctx.clearRect(0, 0, width, height);

    // TODO: background color here.
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    ctx.drawImage(imageData.image, 0, 0);

    // Tile outline settings. Translate to (0.5, 0.5) for stroke 1 and (0, 0) for stroke 2.
    ctx.translate(0, 0);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.75)";

    ctx.beginPath();
    const xStep = tileWidth + inputSpacing;
    const yStep = tileHeight + inputSpacing;
    for (let x = inputMargin; x < width; x += xStep) {
      for (let y = inputMargin; y < height; y += yStep) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + tileWidth, y);
        ctx.lineTo(x + tileWidth, y + tileHeight);
        ctx.lineTo(x, y + tileHeight);
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    ctx.resetTransform();
  };

  return <Canvas width={width} height={height} draw={draw} drawDependencies={drawDependencies} />;
}

export default CanvasInputPreview;
