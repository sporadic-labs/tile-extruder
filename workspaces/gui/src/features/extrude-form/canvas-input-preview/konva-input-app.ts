import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Image } from "konva/lib/shapes/Image";
import { Stage } from "konva/lib/Stage";
import { KonvaApp } from "../../../components/konva-canvas";
import { AppStore } from "../../../store";
import { ExtruderState } from "../../../store/extruder-slice";
import observe from "../../../store/observe";
import { Position, setPosition, setZoom } from "../../../store/visualization-slice";
import { constrain } from "../../../utils/math";
import measureElementContentBox from "../../../utils/measure-element-content-box";

type InputStateSelection = Pick<
  ExtruderState,
  "tileWidth" | "tileHeight" | "inputSpacing" | "inputMargin" | "width" | "height"
>;

export class PanAndZoom {
  private minZoom: number;
  private maxZoom: number;
  private zoom: number;
  private position: Position;

  constructor(private store: AppStore, private stage: Stage, private tileset: Image) {
    const zoomWidth = stage.width() / tileset.width();
    const zoomHeight = stage.height() / tileset.height();
    this.minZoom = Math.min(zoomWidth, zoomHeight);
    this.maxZoom = 4;
    this.zoom = stage.scaleX();
    this.position = stage.position();

    stage.on("dragmove", this.onDragEvent);
    stage.on("wheel", this.onWheelEvent);
  }

  public destroy() {
    this.stage.off("dragmove", this.onDragEvent);
    this.stage.off("wheel", this.onWheelEvent);
  }

  public setZoom(newZoom: number) {
    const zoom = constrain(newZoom, this.minZoom, this.maxZoom);
    if (zoom !== this.zoom) {
      this.zoom = zoom;
      this.stage.scale({ x: zoom, y: zoom });
      if (this.store.getState().visualization.zoom !== this.zoom) {
        this.store.dispatch(setZoom(zoom));
      }
    }
    return this.zoom;
  }

  public setPan(position: Position) {
    const pos = this.constrainPosition(position);
    this.position.x = pos.x;
    this.position.y = pos.y;
    this.stage.position(pos);
    const storePos = this.store.getState().visualization.position;
    if (storePos.x !== pos.x || storePos.y !== pos.y) {
      this.store.dispatch(setPosition(pos));
    }
  }

  private onDragEvent = () => {
    // TODO: write drag logic myself, so we don't have to do this.
    this.setPan(this.stage.position());
  };

  private onWheelEvent = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const oldZoom = this.zoom;
    const pointer = this.stage.getPointerPosition()!;
    let newZoom = e.evt.deltaY > 0 ? oldZoom * 1.1 : oldZoom / 1.1;
    newZoom = this.setZoom(newZoom);
    const relativeX = pointer.x - this.stage.x();
    const relativeY = pointer.y - this.stage.y();
    const x = pointer.x - (relativeX / oldZoom) * newZoom;
    const y = pointer.y - (relativeY / oldZoom) * newZoom;
    this.setPan({ x, y });
  };

  private constrainPosition(pos: Position) {
    let { x, y } = pos;
    const tilesetSize = this.tileset.size();
    const stageSize = this.stage.size();
    const xBoundLeft = 0;
    const xBoundRight = stageSize.width - this.zoom * tilesetSize.width;
    const yBoundTop = 0;
    const yBoundBottom = stageSize.height - this.zoom * tilesetSize.height;
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
    return { x, y };
  }
}

interface TargetSize {
  width: number;
  height: number;
}

export class ResponsiveStage {
  constructor(private stage: Konva.Stage, private target: TargetSize) {
    window.addEventListener("resize", this.onResize);
    this.onResize();
  }

  public destroy() {
    window.removeEventListener("resize", this.onResize);
  }

  private onResize = () => {
    const container = this.stage.container();
    const { width } = measureElementContentBox(container);
    const aspectRatio = this.target.width / this.target.height;
    const maxHeight = window.innerHeight / 2;
    const newWidth = width;
    const newHeight = Math.min(width / aspectRatio, maxHeight);
    this.stage.width(newWidth);
    this.stage.height(newHeight);
  };
}

class KonvaInputApp extends KonvaApp {
  private unsubscribeExtruderStore = () => {};
  private unsubscribeVizStore = () => {};
  private stage!: Konva.Stage;
  private grid!: Konva.Shape;
  private tileset!: Konva.Image;
  private panAndZoom!: PanAndZoom;
  private responsiveStage!: ResponsiveStage;

  public start() {
    const { container, store, imageStorage } = this;
    const extruderState = store.getState().extruder;
    const image = imageStorage.get(extruderState.imageStorageId!)!.image;

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

    this.tileset = new Konva.Image({ image });
    layer.add(this.tileset);

    this.panAndZoom = new PanAndZoom(store, this.stage, this.tileset);

    const { width, height, tileWidth, tileHeight, inputSpacing, inputMargin } = extruderState;
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
    this.grid = grid;

    this.unsubscribeVizStore = observe(
      store,
      (state) => state.visualization,
      (viz) => {
        const { zoom, position, showTilePreview } = viz;
        this.panAndZoom.setZoom(zoom);
        this.panAndZoom.setPan(position);
        this.grid.visible(showTilePreview);
      }
    );

    this.unsubscribeExtruderStore = observe<InputStateSelection>(
      store,
      (state) => {
        const { tileWidth, tileHeight, inputSpacing, inputMargin, width, height } = state.extruder;
        return {
          tileWidth,
          tileHeight,
          inputSpacing,
          inputMargin,
          width,
          height,
        };
      },
      (selection: InputStateSelection) => {
        this.onGridSettingChange(selection);
      }
    );
  }

  public destroy() {
    this.panAndZoom.destroy();
    this.responsiveStage.destroy();
    this.unsubscribeVizStore();
    this.unsubscribeExtruderStore();
  }

  private onGridSettingChange(state: InputStateSelection) {
    this.grid.setAttr("width", state.width);
    this.grid.setAttr("height", state.height);
    this.grid.setAttr("tileWidth", state.tileWidth);
    this.grid.setAttr("tileHeight", state.tileHeight);
    this.grid.setAttr("inputSpacing", state.inputSpacing);
    this.grid.setAttr("inputMargin", state.inputMargin);
  }
}

export default KonvaInputApp;
