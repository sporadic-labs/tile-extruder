import Konva from "konva";
import { KonvaApp } from "../../../components/konva-canvas";
import { ExtruderState } from "../../../store/extruder-slice";
import observe from "../../../store/observe";
import { constrain } from "../../../utils/math";

class KonvaExtrudeApp extends KonvaApp {
  private unsubscribeStore = () => {};

  public start() {
    const { container, store, imageStorage } = this;
    const extruderConfig = store.getState().extruder;
    const image = imageStorage.get(extruderConfig.imageStorageId!)!.image;

    const stage = new Konva.Stage({
      width: 300,
      height: 300,
      container,
      draggable: true,
    });
    stage.container().style.cursor = "move";

    const layer = new Konva.Layer();
    layer.imageSmoothingEnabled(false);
    stage.add(layer);

    const imageCanvas = document.createElement("canvas");
    const imageCanvasCtx = imageCanvas.getContext("2d")!;
    imageCanvas.width = extruderConfig.width;
    imageCanvas.height = extruderConfig.height;
    imageCanvasCtx.drawImage(image, 0, 0);

    const [extrudedWidth, extrudedHeight] = this.calculateNewSize(extruderConfig);
    const extrudedCanvas = document.createElement("canvas");
    const extrudedCanvasCtx = extrudedCanvas.getContext("2d")!;
    extrudedCanvas.width = extrudedWidth;
    extrudedCanvas.height = extrudedHeight;

    function copyPixels(sx: number, sy: number, sw: number, sh: number, dx: number, dy: number) {
      extrudedCanvasCtx.drawImage(imageCanvas, sx, sy, sw, sh, dx, dy, sw, sh);
    }

    function sampleColorFromCanvas(x: number, y: number) {
      const data = imageCanvasCtx.getImageData(x, y, 1, 1).data;
      const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
      return rgba;
    }

    const redraw = (extruderConfig: ExtruderState) => {
      const { tileWidth, tileHeight, inputSpacing, inputMargin, extrudeAmount } = extruderConfig;

      const tw = tileWidth;
      const th = tileHeight;
      const e = extrudeAmount;
      const [rows, cols] = this.calculateRowsCols(extruderConfig);
      extrudedCanvasCtx.clearRect(0, 0, extrudedCanvas.width, extrudedCanvas.height);

      const [extrudedWidth, extrudedHeight] = this.calculateNewSize(extruderConfig);
      extrudedCanvas.width = extrudedWidth;
      extrudedCanvas.height = extrudedHeight;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // sx and sy are the top left of the tile's position in the original image:
          const sx = inputMargin + col * (tw + inputSpacing);
          const sy = inputMargin + row * (th + inputSpacing);

          // dx and dy are the top left of the tile's position in the extruded output:
          const dx = inputMargin + col * (tw + inputSpacing + 2 * e) + e;
          const dy = inputMargin + row * (th + inputSpacing + 2 * e) + e;

          // Copy tile.
          copyPixels(sx, sy, tw, th, dx, dy);

          // Extrude the edges.
          for (let eStep = 1; eStep <= e; eStep++) {
            copyPixels(sx, sy, tw, 1, dx, dy - eStep); // Top
            copyPixels(sx, sy + th - 1, tw, 1, dx, dy + th - 1 + eStep); // Bottom
            copyPixels(sx, sy, 1, th, dx - eStep, dy); // Left
            copyPixels(sx + tw - 1, sy, 1, th, dx + tw - 1 + eStep, dy); // Right
          }

          // Extrude the corners.
          const topLeft = sampleColorFromCanvas(sx, sy);
          const topRight = sampleColorFromCanvas(sx + tw - 1, sy);
          const bottomRight = sampleColorFromCanvas(sx + tw - 1, sy + th - 1);
          const bottomLeft = sampleColorFromCanvas(sx, sy + th - 1);
          extrudedCanvasCtx.fillStyle = topLeft;
          extrudedCanvasCtx.fillRect(dx - e, dy - e, e, e);
          extrudedCanvasCtx.fillStyle = topRight;
          extrudedCanvasCtx.fillRect(dx + tw, dy - e, e, e);
          extrudedCanvasCtx.fillStyle = bottomRight;
          extrudedCanvasCtx.fillRect(dx + tw, dy + th, e, e);
          extrudedCanvasCtx.fillStyle = bottomLeft;
          extrudedCanvasCtx.fillRect(dx - e, dy + th, e, e);
        }
      }

      // Force Konva update.
      tileset.setAttr("image", extrudedCanvas);
    };

    const tileset = new Konva.Image({ image: extrudedCanvas });
    layer.add(tileset);

    redraw(extruderConfig);

    const zoomWidth = stage.width() / tileset.width();
    const zoomHeight = stage.height() / tileset.height();
    let minZoom = Math.min(zoomWidth, zoomHeight);
    let maxZoom = 4;

    function constrainBounds() {
      const pos = stage.position();
      let { x, y } = pos;
      const zoom = stage.scale().x;
      const tilesetSize = tileset.size();
      const stageSize = stage.size();
      const xBoundLeft = 0;
      const xBoundRight = stageSize.width - zoom * tilesetSize.width;
      const yBoundTop = 0;
      const yBoundBottom = stageSize.height - zoom * tilesetSize.height;
      if (xBoundLeft < xBoundRight) {
        x = constrain(x, xBoundLeft, xBoundRight);
      } else {
        x = constrain(x, xBoundRight, xBoundLeft);
      }
      if (yBoundTop < yBoundBottom) {
        y = constrain(y, yBoundTop, yBoundBottom);
      } else {
        y = constrain(y, yBoundBottom, yBoundTop);
      }
      stage.position({ x, y });
    }

    stage.on("dragmove", constrainBounds);

    stage.on("wheel", (e) => {
      e.evt.preventDefault();
      const oldScale = stage.scaleX();
      const pointer = stage.getPointerPosition()!;
      let newScale = e.evt.deltaY > 0 ? oldScale * 1.1 : oldScale / 1.1;
      newScale = constrain(newScale, minZoom, maxZoom);
      const relativeX = pointer.x - stage.x();
      const relativeY = pointer.y - stage.y();
      const newX = pointer.x - (relativeX / oldScale) * newScale;
      const newY = pointer.y - (relativeY / oldScale) * newScale;
      stage.scale({ x: newScale, y: newScale });
      stage.position({ x: newX, y: newY });
      constrainBounds();
    });

    this.unsubscribeStore = observe(
      store,
      (state) => {
        const { tileWidth, tileHeight, inputSpacing, inputMargin, width, height, extrudeAmount } =
          state.extruder;
        return { tileWidth, tileHeight, inputSpacing, inputMargin, width, height, extrudeAmount };
      },
      (selection) => {
        const { tileWidth, tileHeight, inputSpacing, inputMargin, width, height, extrudeAmount } =
          selection;
        redraw(selection as any);
      }
    );
  }

  public destroy() {
    this.unsubscribeStore();
  }

  private calculateRowsCols(config: ExtruderState) {
    const { width, height, tileWidth, tileHeight, inputSpacing, inputMargin } = config;
    const cols = (width - 2 * inputMargin + inputSpacing) / (tileWidth + inputSpacing);
    const rows = (height - 2 * inputMargin + inputSpacing) / (tileHeight + inputSpacing);
    return [rows, cols];
  }

  private calculateNewSize(config: ExtruderState) {
    const { tileWidth, tileHeight, inputSpacing, inputMargin, extrudeAmount } = config;
    const [rows, cols] = this.calculateRowsCols(config);
    const newWidth =
      2 * inputMargin + (cols - 1) * inputSpacing + cols * (tileWidth + 2 * extrudeAmount);
    const newHeight =
      2 * inputMargin + (rows - 1) * inputSpacing + rows * (tileHeight + 2 * extrudeAmount);
    return [newWidth, newHeight];
  }
}

export default KonvaExtrudeApp;
