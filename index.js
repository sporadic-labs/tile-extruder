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
  .version("1.1.0")
  .description("A small CLI to extrude tiles. Use --help for more information.")
  .option("-w, --tileWidth <integer>", "tile width in pixels", toInt)
  .option("-h, --tileHeight <integer>", "tile height in pixels", toInt)
  .option(
    "-c, --color [hex=0x00000000]",
    "RGBA hex color to use for the background color (defaults to transparent)",
    toHex
  )
  .option(
    "-m, --margin [integer=0]",
    "number of pixels between tiles and the edge of the tileset image (defaults to 0)",
    toInt,
    0
  )
  .option(
    "-s, --spacing [integer=0]",
    "number of pixels between neighboring tiles (defaults to 0)",
    toInt,
    0
  )
  .option("-i, --input <path>", "the path to the tileset you want to extrude")
  .option("-o, --output <path>", "the path to output the extruded tileset image")
  .parse(process.argv);

const {
  tileWidth,
  tileHeight,
  margin,
  spacing,
  color,
  input: inputPath,
  output: outputPath
} = program;

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
      extrudedImage.blit(image, destX + tw + 1, destY + th + 1, srcX + tw - 1, srcY + th - 1, 1, 1);
    }
  }

  extrudedImage.write(outputPath);
})();
