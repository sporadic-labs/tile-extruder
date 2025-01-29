/**
 * Simple test util that runs a few tilesets through the extrusion and checks
 * the results against saved snapshots.
 */

import { execSync } from "child_process";
import fs from "fs";
import { Jimp, diff } from "jimp";

interface TestCliArgs {
  w: number;
  h: number;
  e?: number;
  m?: number;
  s?: number;
  c?: number | string;
}
interface TestConfig {
  file: string;
  args: TestCliArgs;
}

const tilesetTests: TestConfig[] = [
  { file: "buch-tileset.png", args: { w: 16, h: 16 } },
  { file: "arachne-tileset.png", args: { w: 8, h: 8 } },
  { file: "mario-tileset.png", args: { w: 16, h: 16 } },
  { file: "test-tileset.png", args: { w: 64, h: 64 } },
  { file: "test-tileset.png", args: { w: 64, h: 64, e: 10 } },
  { file: "transparency-test-tileset.png", args: { w: 64, h: 64 } },
  { file: "borders-tileset.png", args: { w: 8, h: 16 } },
  {
    file: "mario-tileset-10-spacing-5-margin.png",
    args: { w: 16, h: 16, m: 5, s: 10, c: "0x7088ff" },
  },
];

function cliArgsToString(args: TestCliArgs) {
  return Object.entries(args)
    .map(([key, val]) => `${key}${val}`)
    .join("");
}

async function areImagesExactMatches(imagePath1: string, imagePath2: string) {
  try {
    const [image1, image2] = await Promise.all([Jimp.read(imagePath1), Jimp.read(imagePath2)]);
    return diff(image1, image2, 0).percent === 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function failTest(error: unknown) {
  console.error(error);
  process.exit(1);
}

async function main() {
  for (let i = 0; i < tilesetTests.length; i++) {
    const { file, args } = tilesetTests[i];
    const [name, extension] = file.split(".");
    const argsString = cliArgsToString(args);
    const tilesetPath = `./tilesets/${file}`;
    const extrudedTilesetPath = `./tilesets/extruded/${file}`;

    // Make the output path unique, so that the same test image can be used with different args.
    const snapshotTilesetPath = `./tilesets/snapshots/${name}-${argsString}.${extension}`;

    console.log(`Running test ${i + 1}/${tilesetTests.length} on ${file} ${argsString}...`);

    // Build the args string for this run.
    Object.assign(args, { i: tilesetPath, o: extrudedTilesetPath });
    const stringArgs = Object.entries(args)
      .map(([flag, val]) => `-${flag} ${val}`)
      .join(" ");

    try {
      execSync(`node ./bin/cli.js ${stringArgs}`);
    } catch (err) {
      failTest(err);
    }

    if (!fs.existsSync(snapshotTilesetPath)) {
      console.log("No snapshot for this test. Saving...");
      fs.copyFileSync(extrudedTilesetPath, snapshotTilesetPath);
      continue;
    }

    const areEqual = await areImagesExactMatches(extrudedTilesetPath, snapshotTilesetPath);
    if (!areEqual) {
      failTest(new Error(`Test failed! Extruded image does not match saved snapshot.`));
    } else {
      console.log(`Test passed.`);
    }
  }
}

main().catch(failTest);
