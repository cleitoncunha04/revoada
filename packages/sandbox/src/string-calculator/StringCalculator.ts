export class StringCalculator {
	static add(numbers: string): number {
    const delimiters = /[\n,]/;

    const numberArray = numbers.split(delimiters).map(Number);

		return numberArray.reduce((sum, num) => sum + num, 0);
	}
}
