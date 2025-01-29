/*
 * Examples showing how to use the asynchronous extrudeTilesetToImage method to
 * save out a new image containing an extruded tileset.
 */

import { extrudeTilesetToImage } from "tile-extruder";

async function main() {
  console.log("Starting an extrusion...");
  try {
    await extrudeTilesetToImage(
      16,
      16,
      "./images/buch-tileset.png",
      "./images/buch-tileset-extruded.png"
    );
  } catch (err) {
    console.log("Oh no, an error occurred!");
    console.error(err);
  }
  console.log("Extrusion finished.");
}

main();
