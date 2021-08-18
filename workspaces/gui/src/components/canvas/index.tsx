import { DependencyList, useRef, useEffect } from "react";
import css from "./index.module.scss";

interface CanvasDrawFn {
  (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void;
}

interface CanvasProps {
  width: number;
  height: number;
  draw?: CanvasDrawFn;
  drawDependencies?: DependencyList;
}

function Canvas({ draw = () => {}, drawDependencies = [], width, height }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }
    draw(ctx, canvas);
  }, drawDependencies);

  return (
    <div className={css.canvasWrapper}>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </div>
  );
}

export default Canvas;
export type { CanvasProps, CanvasDrawFn };
