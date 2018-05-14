# Tile Extruder

A tiny Node app to extrude tiles in tilesets to avoid bleeding issues.

![demo](./images/demo.png)

![explanation](./images/explanation.png)

You can read more about the bleeding problem and solution [here](http://rotorz.com/unity/tile-system/docs/edge-correction).

## Installation

Make sure you have [node](https://nodejs.org/en/) installed. [Download](https://github.com/sporadic-labs/tile-extruder/archive/master.zip) or [clone](x-github-client://openRepo/https://github.com/sporadic-labs/tile-extruder) the repository, open a terminal in the folder and run:

```
npm install
```

## Usage

Open a terminal in the folder and run a command with the following arguments:

```
node ./index.js --tileWidth <integer> --tileHeight <integer> --input <path> --output <path>
```

An example usage:

```
node ./index.js --tileWidth 25 --tileHeight 25 --input ./tilesets/buch-tileset.png --output ./tilesets/buch-tileset-extruded.png
```

Additional usage information:

```
A small CLI to extrude tiles. Use --help for more information.

Options:

  -V, --version               output the version number
  -w, --tileWidth <integer>   tile width in pixels
  -h, --tileHeight <integer>  tile height in pixels
  -i, --input <path>          the path to the tileset you want to extrude
  -o, --output <path>         the path to output the extruded tileset image
  -h, --help                  output usage information
```

## Using the Extruded Tileset

This tool was built for a Phaser & Tiled project, so here's how to integrate with that pipeline.

If you've already built a map in Tiled with a non-extruded tileset and are looking to replace it with an extruded tileset, you've got a couple options:

* Extrude the tileset and then update your existing tileset in Tiled. In the "Tilesets" panel, click on the edit tileset icon (the wrench) and then click on "Tileset Properties" under the Tileset menu bar item. Edit the "Image" field, replacing the tileset image with the new extruded image and updating to the margin and spacing.
* If you'd rather leave your Tiled file alone, you can just adjust things on the Phaser side. See this [example](https://github.com/sporadic-labs/tile-extruder/blob/master/phaser-test/main.js). You want to load the extruded tileset image, and then when you create your tileset, specify the appropriate margin and spacing:

```
// Parameters: name in Tiled, phaser cache key, tile width, tile height, margin, spacing
const tileset = map.addTilesetImage("tileset", "tileset-extruded", 48, 48, 1, 2);
```

Note: extruded tilesets from the CLI currently only output with 1px margin and 2px spacing. Spacing is the number of pixels between neighboring tiles and margin is the number of pixels between the edges of the image and the tiles.

## Tileset Sources

* Dungeon Tileset by Buch - [Source](https://opengameart.org/content/top-down-dungeon-tileset)
* Minirouge Tileset by Arachne - [Source](https://forums.tigsource.com/index.php?topic=14166.0)
* Mario Tileset - [Source](http://rmrk.net/index.php?topic=37002.0)
