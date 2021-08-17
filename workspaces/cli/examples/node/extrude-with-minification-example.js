/*
 * Example showing how to combine image extrusion with image minification via the popular imagemin
 * plugin.
 */

const { extrudeTilesetToBuffer } = require("../../src/index");
const imagemin = require("imagemin");
const imageminPngquant = require("imagemin-pngquant");
const fs = require("fs");

async function main() {
  const buffer = await extrudeTilesetToBuffer(16, 16, "./buch-tileset.png");
  const minifiedBuffer = await imagemin.buffer(buffer, {
    plugins: [
      imageminPngquant({
        quality: [0.6, 0.8] // See https://github.com/imagemin/imagemin-pngquant
      })
    ]
  });
  fs.writeFileSync("./buch-tileset-extruded-minified.png", minifiedBuffer);
}

main();
