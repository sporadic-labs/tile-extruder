const { exec } = require("child_process");

const cb = (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }
  console.log(stdout);
};

exec(
  "node ./index.js -w 16 -h 16 -i ./images/buch-tileset.png -o ./images/buch-tileset-extruded.png",
  cb
);

exec(
  "node ./index.js -w 8 -h 8 -i ./images/arachne-tileset.png -o ./images/arachne-tileset-extruded.png",
  cb
);

exec(
  "node ./index.js -w 16 -h 16 -i ./images/mario-tileset.png -o ./images/mario-tileset-extruded.png",
  cb
);
