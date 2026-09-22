export class StringCalculator {
	static add(numbers: string): number {
    const delimiter = ",";

    const numberArray = numbers.split(delimiter).map(Number);

		return numberArray.reduce((sum, num) => sum + num, 0);
	}
}
