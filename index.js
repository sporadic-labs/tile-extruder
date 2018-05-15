/**
 * Takes a tileset with no margin/spacing and extrudes the tiles by 1px.
 *
 * TODO:
 *  - Allow for margin (pixels between tiles and edge of tileset image) and spacing (pixels between
 *    tiles) in the input image
 *  - Allow for customizable extrusion amount
 */

const Jimp = require("jimp");
const path = require("path");
const program = require("commander");

const toInt = v => parseInt(v, 10);
const toHex = v => parseInt(v, 16);

program
  .version("1.0.0")
  .description("A small CLI to extrude tiles. Use --help for more information.")
  .option("-w, --tileWidth <integer>", "tile width in pixels", toInt)
  .option("-h, --tileHeight <integer>", "tile height in pixels", toInt)
  .option(
    "-c, --color [hex=0x00000000]",
    "RGBA hex color to use for the background color (defaults to transparent)",
    toHex
  )
  .option("-i, --input <path>", "the path to the tileset you want to extrude")
  .option("-o, --output <path>", "the path to output the extruded tileset image")
  .parse(process.argv);

const { tileWidth, tileHeight, input: inputPath, output: outputPath } = program;

if (!tileWidth) {
  console.log("\nMissing tileWidth! See help below for usage information:");
  program.help();
}
if (!tileHeight) {
  console.log("\nMissing tileHeight! See help below for usage information:");
  program.help();
}
if (!inputPath) {
  console.log("\nMissing path to tileset image! See help below for usage information:");
  program.help();
}
if (!outputPath) {
  console.log("\nMissing path save extruded tileset image! See help below for usage information:");
  program.help();
}

(async () => {
  const image = await Jimp.read(inputPath).catch(err => {
    console.error(`Tileset image could not be loaded from: ${inputPath}`);
    process.exit(1);
  });

  const { width, height } = image.bitmap;
  const cols = width / tileWidth;
  const rows = height / tileHeight;
  const newWidth = (tileWidth + 2) * cols;
  const newHeight = (tileHeight + 2) * rows;

  const extrudedImage = await new Jimp(newWidth, newHeight, color);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let srcX = col * tileWidth;
      let srcY = row * tileHeight;
      let destX = col * (tileWidth + 2);
      let destY = row * (tileHeight + 2);
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
      extrudedImage.blit(image, destX + tw + 1, destY + th + 1, srcX + tw - 1, srcY + th - 1, 1, 1);
    }
  }

  extrudedImage.write(outputPath);
})();
