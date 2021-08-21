# Tile Extruder

Tile extruder is a web app, and a Node CLI & library, to extrude tiles in tilesets to avoid bleeding issues. You can visit the web app here (**TODO LINK**).

![demo](./doc-source/images/demo.png)

![explanation](./doc-source/images/explanation.png)

You can read more about the bleeding problem and solution [~~here~~](http://rotorz.com/unity/tile-system/docs/edge-correction) (note: rotorz site is down as of 12/27/18, you can try this [archived version of the page](https://web.archive.org/web/20180411151113/http://rotorz.com/unity/tile-system/docs/edge-correction) until the site is restored).

## Info

This repository uses yarn workspaces to keep the GUI and CLI source code together. See the individual workspaces for more info on each:

- [`workspaces/cli`](https://github.com/sporadic-labs/tile-extruder/tree/master/workspaces/cli)
- [`workspaces/gui`](https://github.com/sporadic-labs/tile-extruder/tree/master/workspaces/gui)

## Development

If you are contributing to this library, here is how to get started:

- Install [Node](https://nodejs.org/en/).
- `npm install --global yarn`.
- Open the root folder of this repository and run `yarn` to install and link dependencies.
- You can run a command in either the GUI workspace or the CLI workspace via `yarn gui XYZ` or `yarn cli XYZ`. See the individual workspaces for more info on building, running and testing.