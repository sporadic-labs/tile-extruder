#version 300 es

precision highp float;

in vec2 v_texCoord;

uniform sampler2D u_tilesetImage;
uniform vec2 u_tileSize;
uniform vec2 u_canvasSize;
uniform float u_margin;
uniform float u_spacing;
uniform vec4 u_gridColor;
uniform bool u_showGrid;

out vec4 fragColor;

void main() {
  vec2 pixelPos = v_texCoord * u_canvasSize;
  vec2 adjustedTileSize = u_tileSize + u_spacing;
  vec2 adjustedPixelPos = pixelPos - u_margin;
  vec2 posInTileCoords = floor(adjustedPixelPos / adjustedTileSize);
  vec2 pixelPosInTile = adjustedPixelPos - (posInTileCoords * adjustedTileSize);
  vec2 uvPos = u_margin + pixelPosInTile + posInTileCoords * (u_tileSize + u_spacing);
  vec2 texCoord = uvPos / u_canvasSize;
  vec4 imageColor = texture(u_tilesetImage, texCoord);

  // If in margin, return image color directly.
  if(pixelPos.x < u_margin || pixelPos.x >= u_canvasSize.x - u_margin ||
    pixelPos.y < u_margin || pixelPos.y >= u_canvasSize.y - u_margin) {
    fragColor = imageColor;
    return;
  }

  // If in the grid line, mix the image color with the grid color.
  if(u_showGrid && pixelPosInTile.x >= 0.0f && pixelPosInTile.x < u_tileSize.x &&
    pixelPosInTile.y >= 0.0f && pixelPosInTile.y < u_tileSize.y &&
    (pixelPosInTile.x < 1.0f || pixelPosInTile.x > u_tileSize.x - 1.0f ||
    pixelPosInTile.y < 1.0f || pixelPosInTile.y > u_tileSize.y - 1.0f)) {
    fragColor = mix(imageColor, u_gridColor, 0.7f);
    return;
  }

  // Otherwise, return the image color.
  fragColor = imageColor;
}