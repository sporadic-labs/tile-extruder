/*
 * Example showing how to use the asynchronous extrudeTilesetToImage method to
 * save out a new image containing an extruded tileset.
 */

import { extrudeTilesetToImage } from "tile-extruder";

async function main() {
  console.log("Starting an extrusion...");
  try {
    await extrudeTilesetToImage({
      tileWidth: 16,
      tileHeight: 16,
      inputPath: "./images/buch-tileset.png",
      outputPath: "./images/buch-tileset-extruded.png",
    });
  } catch (err) {
    console.log("Oh no, an error occurred!");
    console.error(err);
    process.exitCode = 1;
    return;
  }
  console.log("Extrusion finished.");
}

main();
