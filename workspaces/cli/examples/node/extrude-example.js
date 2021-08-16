/*
 * Example showing how to use the asynchronous extrudeTilesetToImage method to save out a new image
 * containing an extruded tileset.
 */

const { extrudeTilesetToImage } = require("../../src/index");

async function main() {
  console.log("Starting an extrusion...");
  try {
    await extrudeTilesetToImage(16, 16, "./buch-tileset.png", "./buch-tileset-extruded.png");
  } catch (err) {
    console.log("Oh no, an error occurred!");
    console.error(err);
  }
  console.log("Extrusion finished.");
}

main();
