import { extrudeBufferTilesetToJimp, ExtrusionOptions } from "../../../tile-extruder/bin";

export type WorkerStartEvent = {
  buffer: ArrayBuffer;
  tileWidth: number;
  tileHeight: number;
  options: ExtrusionOptions;
};

export type WorkerResultEvent =
  | {
      type: "success";
      data: Buffer;
      width: number;
      height: number;
    }
  | {
      type: "error";
      error: string;
    };

self.onmessage = async (e: MessageEvent<WorkerStartEvent>) => {
  try {
    const { buffer, tileWidth, tileHeight, options } = e.data;

    const jimpImage = await extrudeBufferTilesetToJimp(tileWidth, tileHeight, buffer, options);

    self.postMessage({
      type: "success",
      data: jimpImage.bitmap.data,
      width: jimpImage.bitmap.width,
      height: jimpImage.bitmap.height,
    } as WorkerResultEvent);
  } catch (error) {
    self.postMessage({
      type: "error",
      error: error instanceof Error ? error.message : "Unknown error",
    } as WorkerResultEvent);
  }
};
