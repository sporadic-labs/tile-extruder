"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { useTilesetImage } from "./TilesetImageProvider";
import { createExtrusionProgram, ShaderProgram } from "../extrusionProgram/createExtrusionProgram";
import { createGridProgram } from "../gridProgram/createGridProgram";
import { isError } from "ts-outcome";
import ImageDropZone from "@/app/ImageDropZone";
import { useForm } from "react-hook-form";
import { IntegerField } from "./IntegerField";
import Image from "next/image";
import { MdError } from "react-icons/md";

export type FormValues = {
  tileWidth: number;
  tileHeight: number;
  extrusionAmount: number;
  margin: number;
  spacing: number;
};

const defaultValues: FormValues = {
  tileWidth: 16,
  tileHeight: 16,
  extrusionAmount: 1,
  margin: 0,
  spacing: 0,
};

function ImageInfo({ name, width, height }: { name: string; width: number; height: number }) {
  return (
    <div className="mt-2 text-sm text-gray-500 text-center">
      {name} ({width} x {height}px)
    </div>
  );
}

const calculateExtrudedTilesetDimensions = (
  imageElement: HTMLImageElement,
  options: FormValues
) => {
  // Solve for "cols" & "rows" to get the formulae used here:
  //  width = 2 * margin + (cols - 1) * spacing + cols * tileWidth
  //  height = 2 * margin + (rows - 1) * spacing + rows * tileHeight
  const cols =
    (imageElement.width - 2 * options.margin + options.spacing) /
    (options.tileWidth + options.spacing);
  const rows =
    (imageElement.height - 2 * options.margin + options.spacing) /
    (options.tileHeight + options.spacing);

  // Same calculation but in reverse & inflating the tile size by the extrusion amount
  const newWidth =
    2 * options.margin +
    (cols - 1) * options.spacing +
    cols * (options.tileWidth + 2 * options.extrusionAmount);
  const newHeight =
    2 * options.margin +
    (rows - 1) * options.spacing +
    rows * (options.tileHeight + 2 * options.extrusionAmount);

  return { width: newWidth, height: newHeight };
};

function useCheckDimensions({ width, height }: { width: number; height: number }) {
  const isValidWidth = Number.isInteger(width);
  const isValidHeight = Number.isInteger(height);

  if (!isValidWidth && !isValidHeight) {
    return "The extruded image width and height would not be whole numbers based on your margin, spacing and tileWidth or tileHeight. Double check your settings.";
  }

  if (!isValidWidth) {
    return "The extruded image width would not be a whole number based on your margin, spacing and tileWidth. Double check your settings.";
  }

  if (!isValidHeight) {
    return "The extruded image height would not be a whole number based on your margin, spacing and tileHeight. Double check your settings.";
  }

  return null;
}

export default function ExtruderForm() {
  const sourceCanvasRef = useRef<HTMLCanvasElement>(null);
  const shaderCanvasRef = useRef<HTMLCanvasElement>(null);
  const shaderProgramRef = useRef<ShaderProgram | null>(null);
  const { imageElement, isImageLoading, setImageFile, imageName } = useTilesetImage();
  const [showGrid, setShowGrid] = useState(true);

  const {
    register,
    watch,
    formState: { errors, isValid, isValidating },
  } = useForm<FormValues>({
    defaultValues,
    mode: "onChange",
  });
  const options = watch();
  const hasValidValues = isValid && !isValidating;

  const extrudedShaderDimensions = useMemo(() => {
    if (!imageElement) return { width: 0, height: 0, cols: 0, rows: 0 };
    return calculateExtrudedTilesetDimensions(imageElement, options);
  }, [imageElement, options]);

  const dimensionError = useCheckDimensions(extrudedShaderDimensions);

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
      const gl = sourceCanvas.getContext("webgl2");
      if (!gl) {
        console.error("WebGL not supported");
        return;
      }

      const programResult = createGridProgram({
        gl,
        tilesetImage: image,
        options: {
          tileWidth: options.tileWidth,
          tileHeight: options.tileHeight,
          margin: options.margin,
          spacing: options.spacing,
        },
        showGrid,
        gridColor: { r: 0, g: 1, b: 0, a: 1 },
      });

      if (isError(programResult)) {
        console.error("Error creating grid program:", programResult.error);
        return;
      }

      const { render, destroy } = programResult.value;

      render();

      return destroy;
    }

    updateCanvases();
  }, [imageElement, options, showGrid]);

  // Update the extruded tileset preview canvas when the image element changes.
  useEffect(() => {
    if (!imageElement) {
      return;
    }

    if (!hasValidValues) {
      return;
    }

    const canvas = shaderCanvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }
    const { width, height } = calculateExtrudedTilesetDimensions(imageElement, options);
    canvas.width = width;
    canvas.height = height;

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
  }, [imageElement, hasValidValues, options]);

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
          <div className="cursor-pointer h-[250px] border-2 border-gray-200 p-2 rounded-sm hover:border-blue-500 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center overflow-hidden">
            <ImageDropZone onDrop={handleImageDrop} className="w-full h-full">
              {isImageLoading ? (
                <div className="mt-2 text-sm text-gray-500 flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
                  Loading image...
                </div>
              ) : null}
              {imageElement ? (
                <canvas
                  ref={sourceCanvasRef}
                  data-cy="original-tileset-canvas"
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
          {imageElement && (
            <ImageInfo name={imageName} width={imageElement.width} height={imageElement.height} />
          )}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Extruded Preview</h3>
          <div className="bg-white h-[250px] border-2 border-gray-200 p-2 rounded-sm flex flex-col items-center justify-center overflow-hidden">
            {imageElement ? (
              <canvas
                ref={shaderCanvasRef}
                data-cy="extruded-tileset-canvas"
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
          {imageElement && (
            <ImageInfo
              name="Extruded Tileset"
              width={extrudedShaderDimensions.width}
              height={extrudedShaderDimensions.height}
            />
          )}
        </div>
      </div>

      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {dimensionError && (
          <div
            className="col-span-2 bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded relative text-sm"
            role="alert"
          >
            <div className="flex items-center">
              <MdError className="w-4 h-4 mr-2" />
              <span>{dimensionError}</span>
            </div>
          </div>
        )}
        <IntegerField
          name="tileWidth"
          label="Tile width"
          min={1}
          max={1000}
          register={register}
          errors={errors}
        />
        <IntegerField
          name="tileHeight"
          label="Tile height"
          min={1}
          max={1000}
          register={register}
          errors={errors}
        />
        <IntegerField
          name="extrusionAmount"
          label="Extrusion amount"
          min={1}
          max={1000}
          register={register}
          errors={errors}
          tooltip="How many pixels to extrude each tile. 1px should be enough for most cases."
        />
        <IntegerField
          name="margin"
          label="Margin"
          min={0}
          max={1000}
          register={register}
          errors={errors}
          tooltip={
            <div className="flex flex-col gap-2">
              <p>The margin around the original tileset.</p>
              <Image
                src="/margin-and-spacing.png"
                alt="Margin and spacing diagram"
                width={250}
                height={187}
                className="w-[250px] h-auto"
              />
            </div>
          }
        />
        <IntegerField
          name="spacing"
          label="Spacing"
          min={0}
          max={1000}
          register={register}
          errors={errors}
          tooltip={
            <div className="flex flex-col gap-2">
              <p>The spacing between tiles in the original tileset.</p>
              <Image
                src="/margin-and-spacing.png"
                alt="Margin and spacing diagram"
                width={250}
                height={187}
                className="w-[250px] h-auto"
              />
            </div>
          }
        />
        <div className="flex items-center h-full mt-3">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="showGrid"
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="showGrid" className="text-sm font-medium text-gray-700">
              Toggle tile grid visualization
            </label>
          </div>
        </div>
      </form>

      <button
        onClick={handleDownload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Download Extruded Tileset
      </button>
    </div>
  );
}
