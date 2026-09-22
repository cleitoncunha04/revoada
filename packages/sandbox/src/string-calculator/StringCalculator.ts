export class StringCalculator {
	static add(numbers: string): number {
		const customDelimiter = String.prototype.startsWith.call(numbers, "//") ? numbers[2] : null;

		const endOfDelimiterIndex = customDelimiter ? numbers.indexOf("\n") : -1;

		if (customDelimiter && endOfDelimiterIndex !== -1) {
			numbers = numbers.substring(endOfDelimiterIndex + 1);

			numbers = numbers.split(customDelimiter).join(",");
		}

		const delimiters = /[\n,\r]+/;

		const numberArray = numbers.split(delimiters).map(Number);

		return numberArray.reduce((sum, num) => sum + num, 0);
	}
}
