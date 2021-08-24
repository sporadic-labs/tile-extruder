import { constrain } from "../../../utils/math";
import observe from "../../../store/observe";
import KonvaCanvas, { KonvaFn } from "../../../components/konva-canvas";

const canvasApp: KonvaFn = (Konva, div, store, imageStorage) => {
  const extruderConfig = store.getState().extruder;
  const img = imageStorage.get(extruderConfig.imageStorageId!)!.image;

  const stage = new Konva.Stage({
    width: 300,
    height: 300,
    container: div,
    draggable: true,
  });

  const layer = new Konva.Layer();
  const originalLayer = new Konva.Layer();
  const extrudedLayer = new Konva.Layer();
  stage.add(originalLayer, layer, extrudedLayer);

  const tileset = new Konva.Image({
    image: img,
    x: 0,
    y: 0,
  });
  originalLayer.add(tileset);
  originalLayer.imageSmoothingEnabled(false);

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

  const text = new Konva.Text({
    text: "Loading",
    x: 0,
    y: 0,
  });
  layer.add(text);

  observe(
    store,
    (state) => {
      const { tileWidth, tileHeight } = state.extruder;
      return { tileWidth, tileHeight };
    },
    (selection) => {
      const { tileWidth, tileHeight } = selection;
      text.text(`${tileWidth} x ${tileHeight}`);
    }
  );
};

function CanvasInputPreview() {
  return <KonvaCanvas start={canvasApp} />;
}

export default CanvasInputPreview;
