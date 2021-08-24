import Konva from "konva";
import { original, Unsubscribe } from "@reduxjs/toolkit";
import { constrain } from "../../../utils/math";
import observe from "../../../store/observe";
import KonvaCanvas, { KonvaApp } from "../../../components/konva-canvas/index";

class InputApp extends KonvaApp {
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
    stage.add(layer);

    const tileset = new Konva.Image({ image });
    layer.add(tileset);
    layer.imageSmoothingEnabled(false);

    const { width, height, tileWidth, tileHeight, inputSpacing, inputMargin } = extruderConfig;

    const grid = new Konva.Shape({
      x: 0,
      y: 0,
      width,
      height,
      tileWidth,
      tileHeight,
      inputSpacing,
      inputMargin,
      stroke: "rgba(255,255,255, 0.75)",
      sceneFunc: (context, shape) => {
        context.beginPath();
        const { width, height, tileWidth, tileHeight, inputSpacing, inputMargin } =
          shape.getAttrs();
        const cols = (width - 2 * inputMargin + inputSpacing) / (tileWidth + inputSpacing);
        const rows = (height - 2 * inputMargin + inputSpacing) / (tileHeight + inputSpacing);
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const x = inputMargin + col * (tileWidth + inputSpacing);
            const y = inputMargin + row * (tileHeight + inputSpacing);
            context.moveTo(x, y);
            context.lineTo(x + tileWidth, y);
            context.lineTo(x + tileWidth, y + tileHeight);
            context.lineTo(x, y + tileHeight);
            context.lineTo(x, y);
          }
        }
        context.strokeShape(shape);
      },
    });
    layer.add(grid);

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
        const { tileWidth, tileHeight, inputSpacing, inputMargin, width, height } = state.extruder;
        return { tileWidth, tileHeight, inputSpacing, inputMargin, width, height };
      },
      (selection) => {
        const { tileWidth, tileHeight, inputSpacing, inputMargin, width, height } = selection;
        grid.setAttr("width", width);
        grid.setAttr("height", height);
        grid.setAttr("tileWidth", tileWidth);
        grid.setAttr("tileHeight", tileHeight);
        grid.setAttr("inputSpacing", inputSpacing);
        grid.setAttr("inputMargin", inputMargin);
      }
    );
  }

  public destroy() {
    this.unsubscribeStore();
  }
}

function CanvasInputPreview() {
  return <KonvaCanvas App={InputApp} />;
}

export default CanvasInputPreview;
