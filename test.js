const { exec } = require("child_process");

const cb = (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }
  console.log(stdout);
};

exec(
  "node ./index.js -w 16 -h 16 -i ./tilesets/buch-tileset.png -o ./tilesets/buch-tileset-extruded.png",
  cb
);

exec(
  "node ./index.js -w 8 -h 8 -i ./tilesets/arachne-tileset.png -o ./tilesets/arachne-tileset-extruded.png",
  cb
);

exec(
  "node ./index.js -w 16 -h 16 -i ./tilesets/mario-tileset.png -o ./tilesets/mario-tileset-extruded.png",
  cb
);
