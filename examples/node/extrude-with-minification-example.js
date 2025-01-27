/*
 * Example showing how to combine image extrusion with image minification via the popular imagemin
 * plugin.
 */

const { extrudeTilesetToBuffer } = require("../../bin/index");
const imagemin = require("imagemin").default;
const imageminPngquant = require("imagemin-pngquant").default;
const fs = require("fs");

async function main() {
  const buffer = await extrudeTilesetToBuffer(16, 16, "./buch-tileset.png");
  const minifiedBuffer = await imagemin.buffer(buffer, {
    plugins: [imageminPngquant()],
  });
  fs.writeFileSync("./buch-tileset-extruded-minified.png", minifiedBuffer);
}

main();
