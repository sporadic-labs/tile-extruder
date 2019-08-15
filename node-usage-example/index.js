const tileExtruder = require("../index");

async function main() {
  console.log("Starting an extrusion...");
  try {
    await tileExtruder(16, 16, "./buch-tileset.png", "./buch-tileset-extruded.png");
  } catch (err) {
    console.log("Oh no, an error occurred!");
    console.error(err);
  }
  console.log("Extrusion finished.");
}

main();
