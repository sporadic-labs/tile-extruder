import Konva from "konva";
import { KonvaApp } from "../../../components/konva-canvas";
import { ExtruderState } from "../../../store/extruder-slice";
import observe from "../../../store/observe";
import { PanAndZoom, ResponsiveStage } from "../canvas-input-preview/konva-input-app";

type InputStateSelection = Pick<
  ExtruderState,
  "tileWidth" | "tileHeight" | "inputSpacing" | "inputMargin" | "width" | "height"
>;

class KonvaExtrudeApp extends KonvaApp {
  private unsubscribeExtruderStore = () => {};
  private unsubscribeVizStore = () => {};
  private rows: number = 0;
  private cols: number = 0;
  private extrudedWidth: number = 0;
  private extrudedHeight: number = 0;
  private stage!: Konva.Stage;
  private tileset!: Konva.Image;
  private imageCanvas!: HTMLCanvasElement;
  private imageCanvasCtx!: CanvasRenderingContext2D;
  private extrudedCanvas!: HTMLCanvasElement;
  private extrudedCanvasCtx!: CanvasRenderingContext2D;
  private panAndZoom!: PanAndZoom;
  private responsiveStage!: ResponsiveStage;

  public start() {
    const { container, store, imageStorage } = this;
    const extruderState = store.getState().extruder;
    const image = imageStorage.get(extruderState.imageStorageId!)!.image;

    this.recalculateGrid(extruderState);

    this.stage = new Konva.Stage({
      width: 300,
      height: 300,
      container,
      draggable: true,
    });
    container.style.cursor = "move";
    this.responsiveStage = new ResponsiveStage(this.stage, image);

    const layer = new Konva.Layer();
    layer.imageSmoothingEnabled(false);
    this.stage.add(layer);

    this.imageCanvas = document.createElement("canvas");
    this.imageCanvasCtx = this.imageCanvas.getContext("2d")!;
    this.imageCanvas.width = extruderState.width;
    this.imageCanvas.height = extruderState.height;
    this.imageCanvasCtx.drawImage(image, 0, 0);

    this.extrudedCanvas = document.createElement("canvas");
    this.extrudedCanvasCtx = this.extrudedCanvas.getContext("2d")!;
    this.extrudedCanvas.width = this.extrudedWidth;
    this.extrudedCanvas.height = this.extrudedHeight;

    this.tileset = new Konva.Image({ image: this.extrudedCanvas });
    layer.add(this.tileset);

    this.panAndZoom = new PanAndZoom(store, this.stage, this.tileset);

    this.unsubscribeVizStore = observe(
      store,
      (state) => state.visualization,
      (viz) => {
        const { zoom, position } = viz;
        this.panAndZoom.setZoom(zoom);
        this.panAndZoom.setPan(position);
      }
    );

    this.unsubscribeExtruderStore = observe(
      store,
      (state) => {
        const { tileWidth, tileHeight, inputSpacing, inputMargin, width, height, extrudeAmount } =
          state.extruder;
        return {
          tileWidth,
          tileHeight,
          inputSpacing,
          inputMargin,
          width,
          height,
          extrudeAmount,
        };
      },
      (selection: InputStateSelection) => {
        this.recalculateGrid(selection as any);
        this.redrawExtrusion(selection as any);
      }
    );
  }

  public destroy() {
    this.panAndZoom.destroy();
    this.responsiveStage.destroy();
    this.unsubscribeVizStore();
    this.unsubscribeExtruderStore();
  }

  private redrawExtrusion(state: ExtruderState) {
    const copyPixels = (sx: number, sy: number, sw: number, sh: number, dx: number, dy: number) => {
      this.extrudedCanvasCtx.drawImage(this.imageCanvas, sx, sy, sw, sh, dx, dy, sw, sh);
    };

    const sampleColorFromCanvas = (x: number, y: number) => {
      const data = this.imageCanvasCtx.getImageData(x, y, 1, 1).data;
      const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
      return rgba;
    };

    const { tileWidth, tileHeight, inputSpacing, inputMargin, extrudeAmount } = state;

    const tw = tileWidth;
    const th = tileHeight;
    const e = extrudeAmount;
    this.extrudedCanvasCtx.clearRect(0, 0, this.extrudedCanvas.width, this.extrudedCanvas.height);

    this.extrudedCanvas.width = this.extrudedWidth;
    this.extrudedCanvas.height = this.extrudedHeight;

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
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
        this.extrudedCanvasCtx.fillStyle = topLeft;
        this.extrudedCanvasCtx.fillRect(dx - e, dy - e, e, e);
        this.extrudedCanvasCtx.fillStyle = topRight;
        this.extrudedCanvasCtx.fillRect(dx + tw, dy - e, e, e);
        this.extrudedCanvasCtx.fillStyle = bottomRight;
        this.extrudedCanvasCtx.fillRect(dx + tw, dy + th, e, e);
        this.extrudedCanvasCtx.fillStyle = bottomLeft;
        this.extrudedCanvasCtx.fillRect(dx - e, dy + th, e, e);
      }
    }

    // Force Konva update.
    this.tileset.setAttr("image", this.extrudedCanvas);
  }

  private recalculateGrid(config: ExtruderState) {
    const { width, height, tileWidth, tileHeight, inputSpacing, inputMargin, extrudeAmount } =
      config;
    this.cols = (width - 2 * inputMargin + inputSpacing) / (tileWidth + inputSpacing);
    this.rows = (height - 2 * inputMargin + inputSpacing) / (tileHeight + inputSpacing);
    this.extrudedWidth =
      2 * inputMargin +
      (this.cols - 1) * inputSpacing +
      this.cols * (tileWidth + 2 * extrudeAmount);
    this.extrudedHeight =
      2 * inputMargin +
      (this.rows - 1) * inputSpacing +
      this.rows * (tileHeight + 2 * extrudeAmount);
  }
}

export default KonvaExtrudeApp;
