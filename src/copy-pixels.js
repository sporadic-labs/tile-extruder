/**
 * This copies the source pixels to the destination without any alpha blending.
 * @param {Image} srcImage A Jimp image to copy pixels from.
 * @param {number} srcX X position to start copying from (left).
 * @param {number} srcY Y position to start copying from (top).
 * @param {number} srcW The width of the region to copy.
 * @param {number} srcH The height of the region to copy.
 * @param {Image} destImage A Jimp image to paste the pixels to.
 * @param {number} destX X position to start pasting to (left).
 * @param {number} destY Y position to start pasting to (top).
 */
function copyPixels(srcImage, srcX, srcY, srcW, srcH, destImage, destX, destY) {
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

module.exports = copyPixels;
