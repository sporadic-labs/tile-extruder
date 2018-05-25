const { exec } = require("child_process");

const cb = (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }
  console.log(stdout);
};

const tilesets = [
  { i: "./tilesets/buch-tileset.png", o: "./tilesets/buch-tileset-extruded.png", w: 16, h: 16 },
  { i: "./tilesets/arachne-tileset.png", o: "./tilesets/arachne-tileset-extruded.png", w: 8, h: 8 },
  { i: "./tilesets/mario-tileset.png", o: "./tilesets/mario-tileset-extruded.png", w: 16, h: 16 },
  { i: "./tilesets/test-tileset.png", o: "./tilesets/test-tileset-extruded.png", w: 64, h: 64 },
  {
    i: "./tilesets/borders-tileset.png",
    o: "./tilesets/borders-tileset-extruded.png",
    w: 8,
    h: 16
  },
  {
    i: "./tilesets/mario-tileset-10-spacing-5-margin.png",
    o: "./tilesets/mario-tileset-10-spacing-5-margin-extruded.png",
    w: 16,
    h: 16,
    m: 5,
    s: 10,
    c: "0x7088ff"
  }
];

tilesets.map(args => {
  const stringArgs = Object.entries(args)
    .map(([flag, val]) => `-${flag} ${val}`)
    .join(" ");
  console.log(`Running: ${stringArgs}`);
  exec(`node ./bin/tile-extruder ${stringArgs}`, cb);
});
