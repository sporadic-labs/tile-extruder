"use client";

import { useState, useRef, useEffect } from "react";
import { useTilesetImage } from "./TilesetImageProvider";
import { createExtrusionProgram, ShaderProgram } from "../extrusionProgram/createExtrusionProgram";
import { isError } from "ts-outcome";
import ImageDropZone from "@/app/ImageDropZone";

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
  const { imageElement, isImageLoading, setImageFile } = useTilesetImage();

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

  const handleImageDrop = (files: File[]) => {
    if (files.length > 0) {
      setImageFile(files[0]);
    }
  };

  const handleClearImage = () => {
    setImageFile(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-gray-900">Original Tileset</h3>
            {imageElement && (
              <button
                onClick={handleClearImage}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                title="Clear image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="cursor-pointer bg-white h-[250px] border-2 border-gray-200 p-2 rounded-sm hover:border-blue-500 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center overflow-hidden">
            <ImageDropZone onDrop={handleImageDrop} className="w-full aspect-square">
              {isImageLoading ? (
                <div className="mt-2 text-sm text-gray-500 flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
                  Loading image...
                </div>
              ) : null}
              {imageElement ? (
                <canvas
                  ref={sourceCanvasRef}
                  className="w-full h-full object-contain [image-rendering:pixelated]"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p className="text-lg mb-1">Drag and drop your tileset image here,</p>
                    <p className="text-sm">Or, click to select a file</p>
                  </div>
                </div>
              )}
            </ImageDropZone>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Extruded Preview</h3>
          <div className="bg-white h-[250px] border-2 border-gray-200 p-2 rounded-sm flex flex-col items-center justify-center overflow-hidden">
            {imageElement ? (
              <canvas
                ref={shaderCanvasRef}
                className="w-full h-full object-contain [image-rendering:pixelated]"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
