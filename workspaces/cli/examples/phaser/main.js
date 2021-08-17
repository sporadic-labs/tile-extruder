const config = {
  type: Phaser.WEBGL,
  width: 1000,
  height: 600,
  backgroundColor: "#000000",
  parent: "game-container",
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("buch-tileset", "./assets/buch-tileset-3x.png");
  this.load.image("buch-tileset-extruded", "./assets/buch-tileset-3x-extruded.png");
  this.load.tilemapTiledJSON("map", "./assets/test.json");
}

function create() {
  // Map with non-extruded tileset, showing bug
  const map = this.add.tilemap("map");
  const tileset = map.addTilesetImage("buch-tileset");
  const layer = map.createStaticLayer(0, tileset, -50, 30);

  // Map with extruded tileset, showing no bug
  const extrudedMap = this.add.tilemap("map");
  const extrudedTileset = extrudedMap.addTilesetImage(
    "buch-tileset",
    "buch-tileset-extruded",
    48,
    48,
    1,
    2
  );
  const extrudedLayer = extrudedMap.createStaticLayer(0, extrudedTileset, 500, 30);

  this.cameras.main.setZoom(0.75);
}
