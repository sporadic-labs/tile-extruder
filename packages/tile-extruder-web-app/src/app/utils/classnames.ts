type ClassValue = string | { [key: string]: boolean | undefined } | undefined;

/**
 * Merges multiple class names into a single string. Smaller than clsx.
 *
 * @param args - The class names to merge.
 * @returns A single string of merged class names.
 * @example
 * classnames("button", "primary", { outlined: true }) // "button primary outlined"
 * classnames("button", { primary: false, outlined: true }) // "button outlined"
 */
export function classnames(...args: ClassValue[]): string {
  return args
    .filter(Boolean)
    .map((arg) => {
      if (typeof arg === "string") {
        return arg;
      }

      if (typeof arg === "object") {
        return (
          Object.entries(arg)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .filter(([_, value]) => value)
            .map(([key]) => key)
            .join(" ")
        );
      }

      return "";
    })
    .filter(Boolean)
    .join(" ");
}
