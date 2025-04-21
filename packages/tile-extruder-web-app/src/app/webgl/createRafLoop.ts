/**
 * Creates a requestAnimationFrame loop that provides timing information to a callback.
 * The loop can be started and stopped as needed.
 */
export function createRafLoop(cb: (time: { elapsedMs: number; currentMs: number }) => void) {
  let rafId: number | null = null;
  let startTime: number | null = null;

  const loop = (time: number) => {
    if (!startTime) {
      startTime = time;
    }
    cb({
      elapsedMs: time - startTime,
      currentMs: time,
    });
    rafId = requestAnimationFrame(loop);
  };

  return {
    /**
     * Starts the animation loop if it's not already running.
     * Resets the elapsed time counter.
     */
    start: () => {
      if (!rafId) {
        startTime = null;
        rafId = requestAnimationFrame(loop);
      }
    },
    /**
     * Stops the animation loop if it's running.
     */
    stop: () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    },
  };
}
