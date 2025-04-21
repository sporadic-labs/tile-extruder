#version 300 es
#define PI 3.1415926538

precision highp float;

in vec2 v_texCoord;

uniform sampler2D u_tilesetImage;
uniform vec2 u_tileSize;
uniform vec2 u_canvasSize;
uniform float u_margin;
uniform float u_spacing;
uniform vec4 u_gridColor;
uniform bool u_showGrid;
uniform float u_time;

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
    // Generate a value between 0 and 1 that will take 2 seconds.
    float t = 0.5f + 0.5f * sin(u_time * 0.5f * PI);
    float gridColorAmount = mix(0.1f, 0.8f, t);
    fragColor = mix(imageColor, u_gridColor, gridColorAmount);
    return;
  }

  // Otherwise, return the image color.
  fragColor = imageColor;
}