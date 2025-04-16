"use client";

import { useState, useRef, useEffect } from "react";
import { useTilesetImage } from "./TilesetImageProvider";
import { createExtrusionProgram, ShaderProgram } from "../extrusionProgram/createExtrusionProgram";
import { isError } from "ts-outcome";

type TileExtrusionOptions = {
  tileWidth: number;
  tileHeight: number;
  extrusionAmount: number;
  margin: number;
  spacing: number;
};

export default function ExtruderForm() {
  const [options, setOptions] = useState<TileExtrusionOptions>({
    tileWidth: 16,
    tileHeight: 16,
    extrusionAmount: 1,
    margin: 0,
    spacing: 0,
  });
  const sourceCanvasRef = useRef<HTMLCanvasElement>(null);
  const shaderCanvasRef = useRef<HTMLCanvasElement>(null);
  const shaderProgramRef = useRef<ShaderProgram | null>(null);
  const { imageElement, isImageLoading } = useTilesetImage();

  // Update the tileset preview canvas when the image element changes.
  useEffect(() => {
    async function updateCanvases() {
      const image = imageElement;
      if (!sourceCanvasRef.current || !image) {
        return;
      }

      const sourceCanvas = sourceCanvasRef.current;
      sourceCanvas.width = image.width;
      sourceCanvas.height = image.height;
      const sourceCtx = sourceCanvas.getContext("2d", { willReadFrequently: true });
      if (!sourceCtx) return;
      sourceCtx.clearRect(0, 0, sourceCanvas.width, sourceCanvas.height);
      sourceCtx.drawImage(image, 0, 0);
    }

    updateCanvases();
  }, [imageElement, options]);

  // Update the extruded tileset preview canvas when the image element changes.
  useEffect(() => {
    const canvas = shaderCanvasRef.current;
    if (!canvas) return;

    if (!imageElement) return;

    const gl = canvas.getContext("webgl2");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // TODO: we need to set up margin and spacing here and then in the shader.
    const tilesPerRow = Math.floor(imageElement.width / options.tileWidth);
    const tilesPerCol = Math.floor(imageElement.height / options.tileHeight);

    canvas.width = tilesPerRow * (options.tileWidth + 2 * options.extrusionAmount);
    canvas.height = tilesPerCol * (options.tileHeight + 2 * options.extrusionAmount);

    const programResult = createExtrusionProgram({
      gl,
      tilesetImage: imageElement,
      options: {
        tileWidth: options.tileWidth,
        tileHeight: options.tileHeight,
        extrusionAmount: options.extrusionAmount,
        margin: options.margin,
        spacing: options.spacing,
      },
    });

    if (isError(programResult)) {
      console.error("Error creating extrusion program:", programResult.error);
      return;
    }

    shaderProgramRef.current = programResult.value;
    const { render, destroy } = programResult.value;

    render();

    return destroy;
  }, [imageElement, options]);

  const handleDownload = () => {
    if (!shaderCanvasRef.current || !shaderProgramRef.current) return;

    // Ensure the canvas is up to date before downloading.
    shaderProgramRef.current.render();

    const link = document.createElement("a");
    link.download = "extruded-tileset.png";
    link.href = shaderCanvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Original Tileset</h3>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <canvas
              ref={sourceCanvasRef}
              className="max-w-full h-auto"
              style={{ imageRendering: "pixelated" }}
            />
            {isImageLoading && (
              <div className="mt-2 text-sm text-gray-500 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
                Loading image...
              </div>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Extruded Preview</h3>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <canvas
              ref={shaderCanvasRef}
              className="max-w-full h-auto"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Tile Width</label>
          <input
            type="number"
            min={1}
            value={options.tileWidth}
            onChange={(e) => setOptions({ ...options, tileWidth: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Tile Height</label>
          <input
            type="number"
            min={1}
            value={options.tileHeight}
            onChange={(e) => setOptions({ ...options, tileHeight: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Extrusion Amount</label>
          <input
            type="number"
            min={1}
            value={options.extrusionAmount}
            onChange={(e) => setOptions({ ...options, extrusionAmount: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Margin</label>
          <input
            type="number"
            min={0}
            value={options.margin}
            onChange={(e) => setOptions({ ...options, margin: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Spacing</label>
          <input
            type="number"
            min={0}
            value={options.spacing}
            onChange={(e) => setOptions({ ...options, spacing: parseInt(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Download Extruded Tileset
      </button>
    </div>
  );
}
