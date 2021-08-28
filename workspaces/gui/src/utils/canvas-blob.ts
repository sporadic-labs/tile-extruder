import { ImageMimeType, imageMimeTypes } from "./image-filename-utils";

async function canvasToBlob(canvas: HTMLCanvasElement, type?: string, quality?: any) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob === null) reject(blob);
        else resolve(blob);
      },
      type,
      quality
    );
  });
}

async function getSupportedCanvasBlobTypes() {
  const supportedFormats: ImageMimeType[] = [];

  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;

  const ctx = canvas?.getContext("2d");

  if (!canvas || !ctx) {
    return supportedFormats;
  }

  ctx.fillStyle = "blue";
  ctx.fillRect(0, 0, 1, 1);

  for (const type of imageMimeTypes) {
    try {
      const blob = await canvasToBlob(canvas, type);
      if (blob.type === type) {
        supportedFormats.push(type);
      }
    } catch (error) {
      console.log(`Error checking canvas blob support for ${type}.`);
      console.error(error);
    }
  }

  return supportedFormats;
}

export { getSupportedCanvasBlobTypes, canvasToBlob };
