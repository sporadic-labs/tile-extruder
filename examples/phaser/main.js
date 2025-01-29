class MainScene extends Phaser.Scene {
  zoomSpeed = 0.005;

  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.image("buch-tileset", "./assets/buch-tileset-3x.png");
    this.load.image("buch-tileset-extruded", "./assets/buch-tileset-3x-extruded-4px.png");
    this.load.tilemapTiledJSON("map", "./assets/test.json");
  }

  create() {
    // Map with non-extruded tileset, showing bug
    const map = this.add.tilemap("map");
    const tileset = map.addTilesetImage("buch-tileset");
    map.createLayer(0, tileset, -50, 30);

    // Map with extruded tileset, showing no bug
    const extrudedMap = this.add.tilemap("map");
    const extrudedTileset = extrudedMap.addTilesetImage(
      "buch-tileset",
      "buch-tileset-extruded",
      48,
      48,
      4,
      8,
    );
    extrudedMap.createLayer(0, extrudedTileset, 500, 30);

    const mainCamera = this.cameras.main;
    mainCamera.setZoom(0.75);

    // Round pixels is useful to enable for pixel art to prevent anti-aliasing
    // artifacts when zooming the camera in and out.
    mainCamera.setRoundPixels(true);

    const cursors = this.input.keyboard.createCursorKeys();

    this.controls = new Phaser.Cameras.Controls.SmoothedKeyControl({
      camera: mainCamera,
      left: cursors.left,
      right: cursors.right,
      up: cursors.up,
      down: cursors.down,
      acceleration: 0.04,
      drag: 0.0005,
      maxSpeed: 0.7,
    });

    this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      const newZoom = mainCamera.zoom + deltaY * this.zoomSpeed;
      const clampedZoom = Math.max(0.1, Math.min(newZoom, 3));
      mainCamera.setZoom(clampedZoom);
    });

    const debugUI = this.add.text(-50, 0, `Round Pixels: ${mainCamera.roundPixels}`, {
      font: "18px monospace",
      fill: "#ffffff",
    });

    const rKey = this.input.keyboard.addKey("R");
    rKey.on("down", () => {
      mainCamera.roundPixels = !mainCamera.roundPixels;
      debugUI.setText(`Round Pixels: ${mainCamera.roundPixels}`);
    });
  }

  update(_, delta) {
    this.controls.update(delta);
  }
}

const config = {
  type: Phaser.WEBGL,
  width: 1000,
  height: 600,
  backgroundColor: "#000000",
  parent: "game-container",
  scene: MainScene,
};

const game = new Phaser.Game(config);
