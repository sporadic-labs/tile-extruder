import { describe, expect, it } from "@jest/globals";
import { classnames } from "../classnames";

describe("classnames", () => {
  it("should merge string arguments", () => {
    expect(classnames("button", "primary", "outlined")).toBe("button primary outlined");
  });

  it("should handle object arguments with boolean values", () => {
    expect(classnames("button", { primary: true, outlined: true })).toBe("button primary outlined");
    expect(classnames("button", { primary: false, outlined: true })).toBe("button outlined");
  });

  it("should filter empty strings, undefined and empty objects", () => {
    expect(classnames("button", "", undefined, {})).toBe("button");
  });

  it("should handle empty arguments", () => {
    expect(classnames()).toBe("");
  });

  it("should handle undefined object values", () => {
    expect(classnames("button", { primary: undefined, outlined: true })).toBe("button outlined");
  });

  it("should handle complex combinations", () => {
    expect(
      classnames("base", { active: true, disabled: false }, "additional", { "custom-class": true })
    ).toBe("base active additional custom-class");
  });
});
