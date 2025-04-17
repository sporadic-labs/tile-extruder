#version 300 es

precision highp float;

in vec2 v_texCoord;

uniform sampler2D u_tilesetImage;
uniform vec2 u_tileSize;
uniform float u_extrusion;
uniform vec2 u_canvasSize;
uniform vec2 u_imageSize;

/*
  Margin is padding between tiles and spacing is padding between tiles and edge
  of image. That looks like this this in the input tileset image:

  | m | tile | s | tile | s | tile | m |

  And this in the extruded tileset image:

  | m | e | tile | e | s | e | tile | e | s | e | tile | e | m |

  Where m is margin, e is extrusion, s is spacing.
*/
uniform float u_margin;
uniform float u_spacing;

out vec4 fragColor;

void main() {
  // TODO: handle margin.

  // Calculate pixel position
  vec2 extrudedPixelPos = v_texCoord * u_canvasSize;

  // Break down the extruded image into repeating tile chunks that look like
  // this: | e | tile | e | s | e | tile | e | s | e | tile | e |
  vec2 adjustedTileSize = u_tileSize + 2.0f * u_extrusion + u_spacing;
  // Remove the margin so we can deal with a coordinate system of repeating tile
  // chunks.
  vec2 adjustedPixelPos = extrudedPixelPos - u_margin;
  vec2 posInTileCoords = floor(adjustedPixelPos / adjustedTileSize);
  vec2 pixelPosInTile = adjustedPixelPos - (posInTileCoords * adjustedTileSize);

  // Calculate the pixel we should sample from the tileset image based on the
  // chunk position.
  vec2 uvPosInTile = vec2(0.0f, 0.0f);

  // Handle the X axis first.
  if(pixelPosInTile.x < u_extrusion) {
    // Left extrusion
    uvPosInTile.x = 0.0f;
  } else if(pixelPosInTile.x < u_extrusion + u_tileSize.x) {
    // Inside tile
    uvPosInTile.x = pixelPosInTile.x - u_extrusion;
  } else if(pixelPosInTile.x < 2.0f * u_extrusion + u_tileSize.x) {
    // Right extrusion
    uvPosInTile.x = u_tileSize.x - 1.0f;
  } else {
    // Right spacing
    uvPosInTile.x = pixelPosInTile.x - 2.0f * u_extrusion;
  }

  // Handle the Y axis.
  if(pixelPosInTile.y < u_extrusion) {
    // Top extrusion
    uvPosInTile.y = 0.0f;
  } else if(pixelPosInTile.y < u_extrusion + u_tileSize.y) {
    // Inside tile
    uvPosInTile.y = pixelPosInTile.y - u_extrusion;
  } else if(pixelPosInTile.y < 2.0f * u_extrusion + u_tileSize.y) {
    // Bottom extrusion
    uvPosInTile.y = u_tileSize.y - 1.0f;
  } else {
    // Bottom spacing
    uvPosInTile.y = pixelPosInTile.y - 2.0f * u_extrusion;
  }

  vec2 uvPos = u_margin + uvPosInTile + posInTileCoords * (u_tileSize + u_spacing);

  ivec2 texelCoord = ivec2(uvPos);
  fragColor = texelFetch(u_tilesetImage, texelCoord, 0);
}