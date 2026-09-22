import { describe, expect, it } from "vitest";
import { StringCalculator } from "./StringCalculator.js";

describe("StringCalculator", () => {
	it("should return 0 for an empty string", () => {
		expect(StringCalculator.add("")).toBe(0);
	});
});
