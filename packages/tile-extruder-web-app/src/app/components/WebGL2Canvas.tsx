import { useRef, useEffect } from "react";

/**
 * Wrapper around a canvas element that triggers `onContextChange` when a new
 * webgl2 context is created (or destroyed), which can then be used to set a
 * state variable.
 *
 * @example
 * const [ctx, setCtx] = useState<WebGL2RenderingContext | null>(null);
 * const [shouldRender, setShouldRender] = useState(false);
 *
 * useEffect(() => {
 *  // Draw stuff with ctx.
 *
 *  return () => {
 *    // Do your cleanup.
 *  }
 * }, [ctx])
 *
 * return <>
 *  <Checkbox onToggle={() => setShouldRender(!shouldRender)} />
 *  {shouldRender ? <WebGL2Canvas onContextChange={setShaderGl} /> : null}
 * </>
 */
export function WebGL2Canvas({
  onContextChange,
  ...canvasProps
}: {
  onContextChange: (ctx: WebGL2RenderingContext | null) => void;
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

    const ctx = canvas.getContext("webgl2");
    if (!ctx) {
      onContextChangeRef.current(null);
      console.error("WebGL not supported");
      return;
    }

    onContextChangeRef.current(ctx);

    return () => {
      onContextChangeRef.current(null);
    };
  }, []);

  return <canvas ref={ref} {...canvasProps} />;
}
