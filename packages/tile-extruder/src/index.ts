/**
 * Utils to extrude the tiles in a tileset by 1px.
 */

import { Jimp, JimpInstance } from "jimp";
import { copyPixels, copyPixelToRect } from "./copy-pixels";

export interface ExtrusionOptions {
  margin?: number;
  spacing?: number;
  extrusion?: number;
  color?: number | string;
}

type ExtrusionInput = {
  /** T ile width in pixels. */
  tileWidth: number;
  /** Tile height in pixels. */
  tileHeight: number;
  /**
   * The mime type that should be used for the buffer. Defaults to using the
   * image's original mime type, and if not available, uses png. Supported mime
   * options, see JimpMime.
   */
  mime?: JimpMime;
  /** Number of pixels between tiles and the edge of the tileset image. */
  margin?: number;
  /** Number of pixels between neighboring tiles. */
  spacing?: number;
  /** Number of pixels to extrude the tiles. */
  extrusion?: number;
  /**
   * Color to use for the background color, which only matters if there is
   * margin or spacing. This is passed directly to jimp which takes RGBA hex or
   * a CSS color string, e.g. '#FF0000'. This defaults to transparent white
   * (0xffffff00).
   */
  color?: number | string;
};

/**
 * Annoyingly Jimp doesn't export a mime type, so we redefine it here.
 */
type JimpMime =
  | "image/bmp"
  | "image/tiff"
  | "image/x-ms-bmp"
  | "image/gif"
  | "image/jpeg"
  | "image/png";

interface ImageOptions extends ExtrusionOptions {
  mime?: JimpMime;
}

/**
 * Accepts an image path and returns a Promise that resolves to a Buffer containing the extruded
 * tileset image.
 */
async function extrudeImagePathToBuffer({
  tileWidth,
  tileHeight,
  inputPath,
  mime,
  margin,
  spacing,
  extrusion,
  color,
}: ExtrusionInput & {
  /** The path to the tileset you want to extrude. */
  inputPath: string;
}): Promise<Buffer> {
  const options = { margin, spacing, extrusion, color };
  let extrudedImage;
  try {
    extrudedImage = await extrudeTilesetToJimp(tileWidth, tileHeight, inputPath, options);
  } catch (err) {
    console.error("Error extruding tileset: ", err);
    throw err;
  }
  try {
    const buffer = await extrudedImage.getBuffer(
      mime ?? (extrudedImage.mime as JimpMime) ?? "image/png",
    );
    return buffer;
  } catch (err) {
    console.error("Buffer could not be created from tileset.");
    throw err;
  }
}

/**
 * Accepts an image path and saves out an extruded version of the tileset to `outputPath`. It
 * returns a Promise that resolves when the file has finished saving.
 * @param {integer} tileWidth - tile width in pixels.
 * @param {integer} tileHeight - tile height in pixels.
 * @param {string} inputPath - the path to the tileset you want to extrude.
 * @param {string} outputPath - the path to output the extruded tileset image.
 * @param {object} [options] - optional settings.
 * @param {integer} [options.margin=0] - number of pixels between tiles and the edge of the tileset
 * image.
 * @param {integer} [options.spacing=0] - number of pixels between neighboring tiles.
 * @param {integer} [options.extrusion=1] - number of pixels to extrude the tiles.
 * @param {number} [options.color=0xffffff00] - color to use for the background color, which only
 * matters if there is margin or spacing. This is passed directly to jimp which takes RGBA hex or a
 * CSS color string, e.g. '#FF0000'. This defaults to transparent white.
 * @returns {Promise} - A promise that resolves when finished saving, or rejects with an error.
 */
async function extrudeTilesetToImage(
  tileWidth: number,
  tileHeight: number,
  inputPath: string,
  outputPath: `${string}.${string}`,
  options: ExtrusionOptions,
) {
  let extrudedImage;
  try {
    extrudedImage = await extrudeTilesetToJimp(tileWidth, tileHeight, inputPath, options);
  } catch (err) {
    console.error("Error extruding tileset: ", err);
    throw err;
  }
  try {
    await extrudedImage.write(outputPath);
  } catch (err) {
    console.error(`Tileset image could not be saved to: ${outputPath}`);
    throw err;
  }
}

async function extrudeBufferTilesetToJimp(
  tileWidth: number,
  tileHeight: number,
  buffer: Buffer | ArrayBuffer,
  { margin = 0, spacing = 0, color = 0xffffff00, extrusion = 1 }: ExtrusionOptions = {},
): Promise<JimpInstance> {
  let image: JimpInstance;
  try {
    image = (await Jimp.fromBuffer(buffer)) as JimpInstance;
  } catch (err) {
    console.error(`Tileset image could not be loaded from buffer`);
    throw err;
  }

  console.log("extrudeJimpImage");
  return extrudeJimpImage(tileWidth, tileHeight, image, { margin, spacing, color, extrusion });
}

/**
 * Accepts an image path and returns a Jimp image object containing the extruded image. This is
 * exposed for advanced image processing purposes. For more common uses, see extrudeTilesetToImage
 * or extrudeTilesetToBuffer. It returns a Promise that resolves when it is finished extruding the
 * image.
 * @param {integer} tileWidth - tile width in pixels.
 * @param {integer} tileHeight - tile height in pixels.
 * @param {string} inputPath - the path to the tileset you want to extrude.
 * @param {object} [options] - optional settings.
 * @param {integer} [options.margin=0] - number of pixels between tiles and the edge of the tileset
 * image.
 * @param {integer} [options.spacing=0] - number of pixels between neighboring tiles.
 * @param {integer} [options.extrusion=1] - number of pixels to extrude the tiles.
 * @param {number} [options.color=0xffffff00] - color to use for the background color, which only
 * matters if there is margin or spacing. This is passed directly to jimp which takes RGBA hex or a
 * CSS color string, e.g. '#FF0000'. This defaults to transparent white.
 * @returns {Promise<Image>} - A promise that resolves to a Jimp image object, or rejects with an
 * error.
 */
async function extrudeTilesetToJimp(
  tileWidth: number,
  tileHeight: number,
  inputPath: string,
  { margin = 0, spacing = 0, color = 0xffffff00, extrusion = 1 }: ExtrusionOptions = {},
): Promise<JimpInstance> {
  let image: JimpInstance;
  try {
    image = (await Jimp.read(inputPath)) as JimpInstance;
  } catch (err) {
    console.error(`Tileset image could not be loaded from: ${inputPath}`);
    throw err;
  }

  return extrudeJimpImage(tileWidth, tileHeight, image, { margin, spacing, color, extrusion });
}

function extrudeJimpImage(
  tileWidth: number,
  tileHeight: number,
  image: JimpInstance,
  { margin = 0, spacing = 0, color = 0xffffff00, extrusion = 1 }: ExtrusionOptions = {},
): JimpInstance {
  const { width, height } = image.bitmap;

  // Solve for "cols" & "rows" to get the formulae used here:
  //  width = 2 * margin + (cols - 1) * spacing + cols * tileWidth
  //  height = 2 * margin + (rows - 1) * spacing + rows * tileHeight
  const cols = (width - 2 * margin + spacing) / (tileWidth + spacing);
  const rows = (height - 2 * margin + spacing) / (tileHeight + spacing);

  if (!Number.isInteger(cols) || !Number.isInteger(rows)) {
    throw new Error(
      "Non-integer number of rows or cols found. The image doesn't match the specified parameters. Double check your margin, spacing, tileWidth and tileHeight.",
    );
  }

  // Same calculation but in reverse & inflating the tile size by the extrusion amount
  const newWidth = 2 * margin + (cols - 1) * spacing + cols * (tileWidth + 2 * extrusion);
  const newHeight = 2 * margin + (rows - 1) * spacing + rows * (tileHeight + 2 * extrusion);

  const extrudedImage = new Jimp({ width: newWidth, height: newHeight, color });

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let srcX = margin + col * (tileWidth + spacing); // x of tile top left
      let srcY = margin + row * (tileHeight + spacing); // y of tile top left
      let destX = margin + col * (tileWidth + spacing + 2 * extrusion); // x of the extruded tile top left
      let destY = margin + row * (tileHeight + spacing + 2 * extrusion); // y of the extruded tile top left
      const tw = tileWidth;
      const th = tileHeight;

      // Copy the tile.
      copyPixels({
        srcImage: image,
        srcX,
        srcY,
        srcW: tw,
        srcH: th,
        destImage: extrudedImage,
        destX: destX + extrusion,
        destY: destY + extrusion,
      });

      for (let i = 0; i < extrusion; i++) {
        // Extrude the top row.
        copyPixels({
          srcImage: image,
          srcX,
          srcY,
          srcW: tw,
          srcH: 1,
          destImage: extrudedImage,
          destX: destX + extrusion,
          destY: destY + i,
        });

        // Extrude the bottom row.
        copyPixels({
          srcImage: image,
          srcX,
          srcY: srcY + th - 1,
          srcW: tw,
          srcH: 1,
          destImage: extrudedImage,
          destX: destX + extrusion,
          destY: destY + extrusion + th + (extrusion - i - 1),
        });

        // Extrude left column.
        copyPixels({
          srcImage: image,
          srcX,
          srcY,
          srcW: 1,
          srcH: th,
          destImage: extrudedImage,
          destX: destX + i,
          destY: destY + extrusion,
        });

        // Extrude the right column.
        copyPixels({
          srcImage: image,
          srcX: srcX + tw - 1,
          srcY,
          srcW: 1,
          srcH: th,
          destImage: extrudedImage,
          destX: destX + extrusion + tw + (extrusion - i - 1),
          destY: destY + extrusion,
        });
      }

      // Extrude the top left corner.
      copyPixelToRect({
        srcImage: image,
        srcX,
        srcY,
        destImage: extrudedImage,
        destX: destX,
        destY: destY,
        destW: extrusion,
        destH: extrusion,
      });

      // Extrude the top right corner.
      copyPixelToRect({
        srcImage: image,
        srcX: srcX + tw - 1,
        srcY,
        destImage: extrudedImage,
        destX: destX + extrusion + tw,
        destY: destY,
        destW: extrusion,
        destH: extrusion,
      });

      // Extrude the bottom left corner.
      copyPixelToRect({
        srcImage: image,
        srcX,
        srcY: srcY + th - 1,
        destImage: extrudedImage,
        destX: destX,
        destY: destY + extrusion + th,
        destW: extrusion,
        destH: extrusion,
      });

      // Extrude the bottom right corner.
      copyPixelToRect({
        srcImage: image,
        srcX: srcX + tw - 1,
        srcY: srcY + th - 1,
        destImage: extrudedImage,
        destX: destX + extrusion + tw,
        destY: destY + extrusion + th,
        destW: extrusion,
        destH: extrusion,
      });
    }
  }

  return extrudedImage;
}

export {
  extrudeImagePathToBuffer as extrudeTilesetToBuffer,
  extrudeBufferTilesetToJimp,
  extrudeTilesetToImage,
  extrudeTilesetToJimp,
  ImageOptions,
};
