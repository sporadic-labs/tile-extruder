import React, {
  DependencyList,
  useRef,
  useEffect,
  MutableRefObject,
  ComponentPropsWithoutRef,
} from "react";
import css from "./index.module.scss";
import type Konva from "konva";
import { useStore } from "react-redux";
import { useAppSelector, useAppStore } from "../../store/hooks";
import { useImageStorage } from "../../store/image-storage/react-integration";
import { Store } from "@reduxjs/toolkit";
import { AppStore } from "../../store";
import ImageStorage from "../../store/image-storage/image-storage";
import classNames from "classnames";

const noop = () => {};

type KonvaExport = typeof Konva;

interface KonvaFn {
  (konva: KonvaExport, div: HTMLDivElement, store: AppStore, imageStorage: ImageStorage): void;
}

interface KonvaCanvasProps extends ComponentPropsWithoutRef<"div"> {
  start?: KonvaFn;
}

/**
 * Component that lazy-loads a Konva app into the client-side React app.
 */
function KonvaCanvas({ start = noop, className, ...props }: KonvaCanvasProps) {
  const imageStorage = useImageStorage();
  const store = useAppStore();
  const divClass = classNames(className, css.canvasWrapper);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    import("konva")
      .then((Konva) => {
        start(Konva.default, containerRef.current!, store, imageStorage);
      })
      .catch((err) => {
        console.log("Could not import Konva.");
        console.error(err);
      });
  }, []);

  return <div ref={containerRef} className={divClass} {...props} />;
}

export default KonvaCanvas;
export type { KonvaCanvasProps, KonvaFn };
