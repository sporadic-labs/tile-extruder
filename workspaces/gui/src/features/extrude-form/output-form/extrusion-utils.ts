function copyPixels(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  sx: number,
  sy: number,
  sw: number,
  sh: number,
  dx: number,
  dy: number
) {
  ctx.drawImage(image, sx, sy, sw, sh, dx, dy, sw, sh);
}

function sampleColor(image: HTMLImageElement, x: number, y: number) {
  const { ctx } = createCanvasFromImage(image);
  const data = ctx.getImageData(x, y, 1, 1).data;
  const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
  return rgba;
}

function createCanvasFromImage(image: HTMLImageElement) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(image, 0, 0);
  return { canvas, ctx };
}

function sampleColorFromCanvas(ctx: CanvasRenderingContext2D, x: number, y: number) {
  const data = ctx.getImageData(x, y, 1, 1).data;
  const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
  return rgba;
}

export { copyPixels, sampleColor, createCanvasFromImage, sampleColorFromCanvas };