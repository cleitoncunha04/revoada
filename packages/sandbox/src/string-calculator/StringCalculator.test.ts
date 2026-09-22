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

	it("should return the sum of multiple numbers", () => {
		expect(StringCalculator.add("1,2,3,4, 5")).toBe(15);
	});

	it("should return the sum of numbers with comma and newline delimiters", () => {
		expect(StringCalculator.add("1\n2,3")).toBe(6);
	});
});
