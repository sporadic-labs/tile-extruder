/**
 * Takes a tileset and extrudes the tiles by 1px.
 *
 * TODO:
 *  - Allow for customizable extrusion amount
 *  - Repacking large images?
 *  - Web app
 *  - Restructure this so that the exported module is more easily consumable by other scripts
 */

const Jimp = require("jimp");
const path = require("path");

module.exports = function tileExtruder(
  tileWidth,
  tileHeight,
  margin,
  spacing,
  color,
  inputPath,
  outputPath
) {
  (async () => {
    const image = await Jimp.read(inputPath).catch(err => {
      console.error(`Tileset image could not be loaded from: ${inputPath}`);
      process.exit(1);
    });

    const { width, height } = image.bitmap;

    // Solve for "cols" & "rows" to get the formula used here
    //  width = 2 * margin + (cols - 1) * spacing + cols * tileWidth
    //  height = 2 * margin + (rows - 1) * spacing + rows * tileHeight
    const cols = (width - 2 * margin + spacing) / (tileWidth + spacing);
    const rows = (height - 2 * margin + spacing) / (tileHeight + spacing);

    if (!Number.isInteger(cols) || !Number.isInteger(rows)) {
      console.error(
        "Non-integer number of rows or cols found. The image doesn't match the specified parameters. Double check your margin, spacing, tileWidth and tileHeight."
      );
      process.exit(1);
    }

    // Same calculation but in reverse & inflating the tile size by the extrusion amount
    const newWidth = 2 * margin + (cols - 1) * spacing + cols * (tileWidth + 2);
    const newHeight = 2 * margin + (rows - 1) * spacing + rows * (tileHeight + 2);

    const extrudedImage = await new Jimp(newWidth, newHeight, color);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        let srcX = margin + col * (tileWidth + spacing); // x of tile top left
        let srcY = margin + row * (tileHeight + spacing); // y of tile top left
        let destX = margin + col * (tileWidth + spacing + 2); // x of the extruded tile top left
        let destY = margin + row * (tileHeight + spacing + 2); // y of the extruded tile top left
        const tw = tileWidth;
        const th = tileHeight;

        // Copy the tile
        extrudedImage.blit(image, destX + 1, destY + 1, srcX, srcY, tw, th);

        // Extrude the top row
        extrudedImage.blit(image, destX + 1, destY, srcX, srcY, tw, 1);

        // Extrude the bottom row
        extrudedImage.blit(image, destX + 1, destY + th + 1, srcX, srcY + th - 1, tw, 1);

        // Extrude left column
        extrudedImage.blit(image, destX, destY + 1, srcX, srcY, 1, th);

        // Extrude the right column
        extrudedImage.blit(image, destX + tw + 1, destY + 1, srcX + tw - 1, srcY, 1, th);

        // Corners, order: TL, TR, BL, BR
        extrudedImage.blit(image, destX, destY, srcX, srcY, 1, 1);
        extrudedImage.blit(image, destX + tw + 1, destY, srcX + tw - 1, srcY, 1, 1);
        extrudedImage.blit(image, destX, destY + th + 1, srcX, srcY + th - 1, 1, 1);
        extrudedImage.blit(
          image,
          destX + tw + 1,
          destY + th + 1,
          srcX + tw - 1,
          srcY + th - 1,
          1,
          1
        );
      }
    }

    extrudedImage.write(outputPath);
  })();
};
