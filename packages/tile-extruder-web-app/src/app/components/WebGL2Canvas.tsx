import { useRef, useEffect } from "react";

/**
 * Wrapper around a canvas element that triggers `onContextChange` when a new
 * webgl2 context is created (or destroyed).
 */
export function WebGL2Canvas({
  onContextChange,
  ...canvasProps
}: {
  onContextChange: (gl: WebGL2RenderingContext | null) => void;
} & React.ComponentPropsWithoutRef<"canvas">) {
  const ref = useRef<HTMLCanvasElement>(null);
  const onContextChangeRef = useRef(onContextChange);

  onContextChangeRef.current = onContextChange;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) {
      onContextChangeRef.current(null);
      return;
    }

    const gl = canvas.getContext("webgl2");
    if (!gl) {
      onContextChangeRef.current(null);
      console.error("WebGL not supported");
      return;
    }

    onContextChangeRef.current(gl);

    return () => {
      onContextChangeRef.current(null);
    };
  }, []);

  return <canvas ref={ref} {...canvasProps} />;
}
