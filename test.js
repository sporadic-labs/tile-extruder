/**
 * Simple test util that runs a few tilesets through the extrusion and checks the results against
 * saved snapshots.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const Jimp = require("jimp");

const tilesetTests = [
  { file: "buch-tileset.png", args: { w: 16, h: 16 } },
  { file: "arachne-tileset.png", args: { w: 8, h: 8 } },
  { file: "mario-tileset.png", args: { w: 16, h: 16 } },
  { file: "test-tileset.png", args: { w: 64, h: 64 } },
  { file: "test-tileset.png", args: { w: 64, h: 64, e: 10 } },
  { file: "transparency-test-tileset.png", args: { w: 64, h: 64 } },
  { file: "borders-tileset.png", args: { w: 8, h: 16 } },
  {
    file: "mario-tileset-10-spacing-5-margin.png",
    args: { w: 16, h: 16, m: 5, s: 10, c: "0x7088ff" }
  }
];

function cliArgsToString(args) {
  return Object.entries(args)
    .map(([key, val]) => `${key}${val}`)
    .join("");
}

async function areImagesExactMatches(imagePath1, imagePath2) {
  try {
    const [image1, image2] = await Promise.all([Jimp.read(imagePath1), Jimp.read(imagePath2)]);
    return Jimp.diff(image1, image2, 0).percent === 0;
  } catch {
    return false;
  }
}

async function main() {
  for (let i = 0; i < tilesetTests.length; i++) {
    let wasTestSuccessful = true;

    const { file, args } = tilesetTests[i];
    const [name, extension] = file.split(".");
    const argsString = cliArgsToString(args);
    const tilesetPath = `./tilesets/${file}`;
    const extrudedTilesetPath = `./tilesets/extruded/${file}`;

    // Make the output path unique, so that the same test image can be used with different args.
    const snapshotTilesetPath = `./tilesets/snapshots/${name}-${argsString}.${extension}`;

    console.log(`Running test ${i + 1}/${tilesetTests.length} on ${file}...`);

    // Build the args string for this run.
    Object.assign(args, { i: tilesetPath, o: extrudedTilesetPath });
    const stringArgs = Object.entries(args)
      .map(([flag, val]) => `-${flag} ${val}`)
      .join(" ");

    execSync(`node ./bin/tile-extruder ${stringArgs}`, (err, stdout, stderr) => {
      if (err) {
        wasTestSuccessful = false;
        console.error(`exec error: ${err}`);
        return;
      }
      if (stderr) {
        wasTestSuccessful = false;
        console.log(stderr);
      }
      if (stdout) console.log(args.i, args.o);
    });

    if (!fs.existsSync(snapshotTilesetPath)) {
      console.log("No snapshot for this test. Saving...");
      fs.copyFileSync(extrudedTilesetPath, snapshotTilesetPath);
      continue;
    }

    const areEqual = await areImagesExactMatches(extrudedTilesetPath, snapshotTilesetPath);
    if (!areEqual) wasTestSuccessful = false;

    console.log("Test passed: ", wasTestSuccessful);
  }
}

main().catch(console.error);
