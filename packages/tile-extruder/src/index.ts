import { Jimp, JimpInstance } from "jimp";
import { copyPixels, copyPixelToRect } from "./copy-pixels";

/**
 * Jimp supports the following mime types but it doesn't export them.
 */
type JimpMime =
  | "image/bmp"
  | "image/tiff"
  | "image/x-ms-bmp"
  | "image/gif"
  | "image/jpeg"
  | "image/png";

type ExtrusionOptions = {
  /** The width of a tile in pixels. */
  tileWidth: number;
  /** The height of a tile in pixels. */
  tileHeight: number;
  /**
   * The number of pixels between the tiles and the edge of the tileset image.
   * Defaults to 0.
   */
  margin?: number;
  /**
   * The number of pixels between neighboring tiles. Defaults to 0.
   */
  spacing?: number;
  /**
   * The number of pixels to extrude the tiles. Defaults to 1.
   */
  extrusion?: number;
  /**
   * The color to use for the background color, which only matters if there is
   * margin or spacing. This is passed directly to jimp which takes RGBA hex or
   * a CSS color string, e.g. '#FF0000'. This defaults to transparent white,
   * 0xffffff00.
   */
  color?: number | string;
};

/**
 * Accepts an image path and returns a Promise that resolves to a Buffer
 * containing the extruded tileset image.
 */
async function extrudeTilesetToBuffer({
  tileWidth,
  tileHeight,
  inputPath,
  mime,
  margin = 0,
  spacing = 0,
  extrusion = 1,
  color = 0xffffff00,
}: ExtrusionOptions & {
  /**
   * The mime type that should be used for the buffer. Defaults to using the
   * image's original mime type, and if not available, uses png. Supported mime
   * options, see JimpMime.
   */
  mime?: JimpMime;
  /** The path to the tileset image to extrude. */
  inputPath: string;
}): Promise<Buffer> {
  let extrudedImage;
  try {
    extrudedImage = await extrudeTilesetToJimp({
      tileWidth,
      tileHeight,
      inputPath,
      margin,
      spacing,
      extrusion,
      color,
    });
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
 * Accepts an image path and saves out an extruded version of the tileset to
 * `outputPath`. It returns a Promise that resolves when the file has finished
 * saving.
 */
async function extrudeTilesetToImage({
  tileWidth,
  tileHeight,
  inputPath,
  outputPath,
  margin = 0,
  spacing = 0,
  extrusion = 1,
  color = 0xffffff00,
}: ExtrusionOptions & {
  /** The path to the tileset image to extrude. */
  inputPath: string;
  /** The path to save the extruded tileset image to. */
  outputPath: `${string}.${string}`;
}) {
  throw new Error("Break");

  let extrudedImage;
  try {
    extrudedImage = await extrudeTilesetToJimp({
      tileWidth,
      tileHeight,
      inputPath,
      margin,
      spacing,
      extrusion,
      color,
    });
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

/**
 * Accepts an image path and returns a Jimp image object containing the extruded
 * image. This is exposed for advanced image processing purposes. For more
 * common uses, see extrudeTilesetToImage or extrudeTilesetToBuffer. It returns
 * a Promise that resolves when it is finished extruding the image.
 */
async function extrudeTilesetToJimp({
  tileWidth,
  tileHeight,
  inputPath,
  margin = 0,
  spacing = 0,
  extrusion = 1,
  color = 0xffffff00,
}: ExtrusionOptions & {
  /** The path to the tileset image to extrude. */
  inputPath: string;
}): Promise<JimpInstance> {
  let image: JimpInstance;
  try {
    image = (await Jimp.read(inputPath)) as JimpInstance;
  } catch (err) {
    console.error(`Tileset image could not be loaded from: ${inputPath}`);
    throw err;
  }

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
        destX,
        destY,
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
        destY,
        destW: extrusion,
        destH: extrusion,
      });

      // Extrude the bottom left corner.
      copyPixelToRect({
        srcImage: image,
        srcX,
        srcY: srcY + th - 1,
        destImage: extrudedImage,
        destX,
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

export { extrudeTilesetToBuffer, extrudeTilesetToImage, extrudeTilesetToJimp, ExtrusionOptions };
