#!/usr/bin/env node

import program from "commander";
import { extrudeTilesetToImage } from "./index";

const toInt = (v: string) => parseInt(v, 10);
const toHex = (v: string) => parseInt(v, 16);

program
  .version("2.1.0")
  .description("A small CLI to extrude tiles. Use --help for more information.")
  .option("-w, --tileWidth <integer>", "tile width in pixels", toInt)
  .option("-h, --tileHeight <integer>", "tile height in pixels", toInt)
  .option("-i, --input <path>", "the path to the tileset you want to extrude")
  .option(
    "-o, --output <path>",
    "the path to output the extruded tileset image (default: inputPath where filename is extended with '_extruded')"
  )
  .option(
    "-c, --color [hex=0xffffff00]",
    "RGBA color to use for the background color, only matters if there's margin or spacing (default: transparent white)",
    toHex
  )
  .option(
    "-m, --margin [integer=0]",
    "number of pixels between tiles and the edge of the tileset image",
    toInt,
    0
  )
  .option("-s, --spacing [integer=0]", "number of pixels between neighboring tiles", toInt, 0)
  .option("-e, --extrusion [integer=1]", "number of pixels to extrude by", toInt, 1)
  .parse(process.argv);

const {
  tileWidth,
  tileHeight,
  margin,
  spacing,
  extrusion,
  color,
  input: inputPath,
  output: outputPath,
} = program.opts();

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
let modifiedOutputPath = outputPath;
if (!outputPath) {
  const splittedInputPath = inputPath.split(".");
  const inputFileExtension = splittedInputPath.pop();
  const reducedInputPath = splittedInputPath.join(".");
  modifiedOutputPath = `${reducedInputPath}_extruded.${inputFileExtension}`;
}

extrudeTilesetToImage(tileWidth, tileHeight, inputPath, modifiedOutputPath, {
  margin,
  spacing,
  extrusion,
  color,
});
