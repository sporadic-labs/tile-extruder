import type { JimpInstance } from "jimp";

/**
 * This copies the source pixels from a rectangular region of a Jimp image to a
 * destination rectangle in another Jimp image, without any alpha blending.
 */
function copyPixels({
  srcImage,
  srcX,
  srcY,
  srcW,
  srcH,
  destImage,
  destX,
  destY,
}: {
  /** A Jimp image to copy pixels from. */
  srcImage: JimpInstance;
  /** X position to start copying from (left). */
  srcX: number;
  /** Y position to start copying from (top). */
  srcY: number;
  /** The width of the region to copy. */
  srcW: number;
  /** The height of the region to copy. */
  srcH: number;
  /** A Jimp image to paste the pixels to. */
  destImage: JimpInstance;
  /** X position to start pasting to (left). */
  destX: number;
  /** Y position to start pasting to (top). */
  destY: number;
}) {
  srcImage.scan(srcX, srcY, srcW, srcH, (curSrcX, curSrcY, curSrcIndex) => {
    const curDestX = destX + (curSrcX - srcX);
    const curDestY = destY + (curSrcY - srcY);
    const curDestIndex = destImage.getPixelIndex(curDestX, curDestY);
    destImage.bitmap.data[curDestIndex + 0] = srcImage.bitmap.data[curSrcIndex + 0];
    destImage.bitmap.data[curDestIndex + 1] = srcImage.bitmap.data[curSrcIndex + 1];
    destImage.bitmap.data[curDestIndex + 2] = srcImage.bitmap.data[curSrcIndex + 2];
    destImage.bitmap.data[curDestIndex + 3] = srcImage.bitmap.data[curSrcIndex + 3];
  });
}

/**
 * This copies the source pixel from a Jimp image to every pixel in a
 * destination rectangle within another Jimp image, without any alpha blending.
 */
function copyPixelToRect({
  srcImage,
  srcX,
  srcY,
  destImage,
  destX,
  destY,
  destW,
  destH,
}: {
  /** A Jimp image to copy pixels from. */
  srcImage: JimpInstance;
  /** X position of the pixel to copy. */
  srcX: number;
  /** Y position of the pixel to copy. */
  srcY: number;
  /** A Jimp image to paste the pixels to. */
  destImage: JimpInstance;
  /** X position to start pasting to (left). */
  destX: number;
  /** Y position to start pasting to (top). */
  destY: number;
  /** The width of the destination region. */
  destW: number;
  /** The height of the destination region. */
  destH: number;
}) {
  const srcIndex = srcImage.getPixelIndex(srcX, srcY);
  destImage.scan(destX, destY, destW, destH, (_, __, curDestIndex) => {
    destImage.bitmap.data[curDestIndex + 0] = srcImage.bitmap.data[srcIndex + 0];
    destImage.bitmap.data[curDestIndex + 1] = srcImage.bitmap.data[srcIndex + 1];
    destImage.bitmap.data[curDestIndex + 2] = srcImage.bitmap.data[srcIndex + 2];
    destImage.bitmap.data[curDestIndex + 3] = srcImage.bitmap.data[srcIndex + 3];
  });
}

export { copyPixels, copyPixelToRect };
