const { exec } = require("child_process");

const cb = (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }
  console.log(stdout);
};

const tilesets = [
  { path: "./tilesets/buch-tileset", w: 16, h: 16 },
  { path: "./tilesets/arachne-tileset", w: 8, h: 8 },
  { path: "./tilesets/mario-tileset", w: 16, h: 16 },
  { path: "./tilesets/test-tileset", w: 64, h: 64 }
];

tilesets.map(({ path, w, h }) => {
  exec(`node ./index.js -w ${w} -h ${h} -i ${path}.png -o ${path}-extruded.png`, cb);
});
