/**
 * Takes a tileset with no margin/spacing and extrudes the tiles by 1px.
 *
 * TODO:
 *  - Allow for margin (pixels between tiles and edge of tileset image) and spacing (pixels between
 *    tiles) in the input image
 *  - Allow for customizable extrusion amount
 *  - Allow JPEG
 */

const Jimp = require("jimp");
const path = require("path");
const program = require("commander");

program
  .version("1.0.0")
  .description("A small CLI to extrude tiles. Use --help for more information.")
  .option("-w, --tileWidth <integer>", "tile width in pixels", parseInt)
  .option("-h, --tileHeight <integer>", "tile height in pixels", parseInt)
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

  const extrudedImage = await new Jimp(newWidth, newHeight, 0x000000ff);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let srcX = col * tileWidth;
      let srcY = row * tileHeight;
      let destX = col * (tileWidth + 2);
      let destY = row * (tileHeight + 2);
      const tw = tileWidth;
      const th = tileHeight;

      extrudedImage.blit(image, destX + 1, destY + 1, srcX, srcY, tw, th);

      for (let dx = 0; dx < tw; dx++) {
        const firstRowColor = image.getPixelColor(srcX + dx, srcY);
        extrudedImage.setPixelColor(firstRowColor, destX + dx + 1, destY);

        const lastRowColor = image.getPixelColor(srcX + dx, srcY + th - 1);
        extrudedImage.setPixelColor(lastRowColor, destX + dx + 1, destY + th + 1);
      }

      for (let dy = 0; dy < th; dy++) {
        const firstColColor = image.getPixelColor(srcX, srcY + dy);
        extrudedImage.setPixelColor(firstColColor, destX, destY + dy + 1);

        const lastColColor = image.getPixelColor(srcX + tw - 1, srcY + dy);
        extrudedImage.setPixelColor(lastColColor, destX + tw + 1, destY + dy + 1);
      }

      const topLeftColor = image.getPixelColor(srcX, srcY);
      extrudedImage.setPixelColor(topLeftColor, destX, destY);

      const topRightColor = image.getPixelColor(srcX + tw - 1, srcY);
      extrudedImage.setPixelColor(topRightColor, destX + th + 1, destY);

      const bottomLeftColor = image.getPixelColor(srcX, srcY + th - 1);
      extrudedImage.setPixelColor(bottomLeftColor, destX, destY + th + 1);

      const bottomRightColor = image.getPixelColor(srcX + tw - 1, srcY + th - 1);
      extrudedImage.setPixelColor(bottomRightColor, destX + tw + 1, destY + th + 1);
    }
  }

  extrudedImage.write(outputPath);
})();
