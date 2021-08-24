import React, { useRef, useEffect, ComponentPropsWithoutRef } from "react";
import { useAppStore } from "../../store/hooks";
import { useImageStorage } from "../../store/image-storage/react-integration";
import { AppStore } from "../../store";
import ImageStorage from "../../store/image-storage/image-storage";
import classNames from "classnames";
import css from "./index.module.scss";

const noop = () => {};

class KonvaApp {
  constructor(
    protected container: HTMLDivElement,
    protected store: AppStore,
    protected imageStorage: ImageStorage
  ) {}
  public start() {}
  public destroy() {}
}
interface KonvaCanvasProps extends ComponentPropsWithoutRef<"div"> {
  App: typeof KonvaApp;
}

/**
 * Component that lazy-loads a Konva app into the client-side React app.
 */
function KonvaCanvas({ App, className, ...props }: KonvaCanvasProps) {
  const imageStorage = useImageStorage();
  const store = useAppStore();
  const divClass = classNames(className, css.canvasWrapper);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const instance = new App(containerRef.current!, store, imageStorage);
    instance.start();
    return () => instance.destroy();
  }, [App, imageStorage, store]);

  return <div ref={containerRef} className={divClass} {...props} />;
}

export default KonvaCanvas;
export { KonvaApp };
export type { KonvaCanvasProps };
