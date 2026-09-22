import { describe, expect, it } from "vitest";
import { StringCalculator } from "./StringCalculator.js";

describe("StringCalculator", () => {
	it("should return 0 for an empty string", () => {
		expect(StringCalculator.add("")).toBe(0);
	});

	it("should return the number for a single number string", () => {
		expect(StringCalculator.add("5")).toBe(5);
	});

  it("should return the sum of two numbers", () => {
    expect(StringCalculator.add("1,2")).toBe(3);
  });
});
