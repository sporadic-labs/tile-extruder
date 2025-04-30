"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { useTilesetImage } from "./TilesetImageProvider";
import { createExtrusionProgram, ShaderProgram } from "../extrusionProgram/createExtrusionProgram";
import { createGridProgram } from "../gridProgram/createGridProgram";
import { isError } from "ts-outcome";
import ImageDropZone from "@/app/components/ImageDropZone";
import { useForm } from "react-hook-form";
import { IntegerField } from "./IntegerField";
import { MdClose, MdError, MdOutlineImage } from "react-icons/md";
import Image from "next/image";
import { Button } from "@/app/components/Button";
import styles from "./ExtruderForm.module.css";

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
    <div className={styles.imageInfo}>
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
    <div className={styles.container}>
      <div className={styles.tilesetImagesSection}>
        <div className={styles.imageContainer}>
          <div className={styles.imageHeader}>
            <h3 className={styles.imageTitle}>Original Tileset</h3>
            {imageElement && (
              <button onClick={handleClearImage} className={styles.clearButton} title="Clear image">
                <MdClose size={16} />
              </button>
            )}
          </div>
          <ImageDropZone onDrop={handleImageDrop} className={styles.image}>
            {isImageLoading ? (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                Loading...
              </div>
            ) : (
              <>
                {imageElement ? (
                  <canvas ref={sourceCanvasRef} className={styles.imageCanvas} />
                ) : (
                  <div className={styles.dropzoneContent}>
                    <MdOutlineImage size={32} />
                    <div className={styles.dropzoneText}>
                      Drag and drop your tileset image here, or click to select a file
                    </div>
                  </div>
                )}
              </>
            )}
          </ImageDropZone>
          {imageElement ? (
            <ImageInfo
              name={imageName || "Tileset"}
              width={imageElement.width}
              height={imageElement.height}
            />
          ) : null}
        </div>

        <div className={styles.imageContainer}>
          <div className={styles.imageHeader}>
            <h3 className={styles.imageTitle}>Extruded Tileset</h3>
          </div>
          <div className={styles.image}>
            {imageElement && hasValidValues ? (
              <canvas
                ref={shaderCanvasRef}
                className={styles.imageCanvas}
                data-cy="extruded-tileset-canvas"
              />
            ) : (
              <div className={styles.dropzoneContent}>
                {!imageElement
                  ? "Upload a tileset to see the extruded version"
                  : !hasValidValues
                  ? "Fix the form errors to see the extruded version"
                  : null}
              </div>
            )}
          </div>
          {imageElement ? (
            <ImageInfo
              name="Extruded Tileset"
              width={extrudedShaderDimensions.width}
              height={extrudedShaderDimensions.height}
            />
          ) : null}
        </div>
      </div>

      <div className={styles.form}>
        {dimensionError && (
          <div role="alert" className={styles.error}>
            <MdError size={24} />
            <span>{dimensionError}</span>
          </div>
        )}

        <div className={styles.formInputs}>
          <IntegerField
            name="tileWidth"
            label="Tile Width"
            min={1}
            max={1000}
            register={register}
            errors={errors}
          />

          <IntegerField
            name="tileHeight"
            label="Tile Height"
            min={1}
            max={1000}
            register={register}
            errors={errors}
          />

          <IntegerField
            name="extrusionAmount"
            label="Extrusion Amount"
            min={1}
            max={1000}
            register={register}
            errors={errors}
            tooltip={
              <div className={styles.tooltipContent}>
                <div>
                  How many pixels to extrude each tile. 1px should be enough for most cases.
                  Extrusion looks like this:
                </div>
                <Image
                  src="/images/explanation.png"
                  alt="Visual explanation of tile extrusion"
                  width={200}
                  height={200}
                  className={styles.tooltipImage}
                />
              </div>
            }
          />

          <IntegerField
            name="margin"
            label="Margin"
            min={0}
            max={1000}
            register={register}
            errors={errors}
            tooltip={
              <div className={styles.tooltipContent}>
                <div>The margin around the original tileset.</div>
                <Image
                  src="/margin-and-spacing.png"
                  alt="Margin and spacing diagram"
                  width={250}
                  height={187}
                  className={styles.tooltipImageLarge}
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
              <div className={styles.tooltipContent}>
                <div>The spacing between tiles in the original tileset.</div>
                <Image
                  src="/margin-and-spacing.png"
                  alt="Margin and spacing diagram"
                  width={250}
                  height={187}
                  className={styles.tooltipImageLarge}
                />
              </div>
            }
          />

          <label className={styles.gridCheckbox}>
            <input
              type="checkbox"
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
            />
            Toggle tile grid visualization
          </label>
        </div>

        <div className={styles.actions}>
          <Button
            type="button"
            onClick={handleDownload}
            disabled={!imageElement || !hasValidValues || !!dimensionError}
          >
            Download Extruded Tileset
          </Button>
        </div>
      </div>
    </div>
  );
}
