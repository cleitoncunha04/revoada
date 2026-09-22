export class StringCalculator {
	private static getDelimiter(numbers: string): {
		delimiter: string | null;
		endOfDelimiterIndex: number;
	} {
		const customDelimiter = String.prototype.startsWith.call(numbers, "//")
			? numbers[2]
			: null;

		const endOfDelimiterIndex = customDelimiter ? numbers.indexOf("\n") : -1;

		return { delimiter: customDelimiter ?? null, endOfDelimiterIndex };
	}

	private static getNumbersArray(
		numbers: string,
		customDelimiter: string | null,
		endOfDelimiterIndex: number,
	): number[] {
		if (customDelimiter && endOfDelimiterIndex !== -1) {
			numbers = numbers.substring(endOfDelimiterIndex + 1);

			numbers = numbers.split(customDelimiter).join(",");
		}

		const delimiters = /[\n,\r]+/;

		return numbers.split(delimiters).map(Number);
	}

	private static getNegativeNumbers(numbers: number[]): number[] {
		return numbers.filter((num) => num < 0);
	}

	private static sum(numbers: number[]): number {
		return numbers.reduce((sum, num) => (num > 1000 ? sum : num + sum), 0);
	}

	public static add(numbers: string): number {
		const { delimiter: customDelimiter, endOfDelimiterIndex } =
			this.getDelimiter(numbers);

		const numberArray = this.getNumbersArray(
			numbers,
			customDelimiter,
			endOfDelimiterIndex,
		);

		const negativeNumbers = this.getNegativeNumbers(numberArray);

		if (negativeNumbers.length > 0) {
			throw new Error(`Negatives not allowed: ${negativeNumbers.join(",")}`);
		}

		return this.sum(numberArray);
	}
}
