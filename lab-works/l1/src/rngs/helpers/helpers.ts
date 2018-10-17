export function getMiddleOfNumber(number: number): number {
	let buffer: string = number.toString();
	if (buffer.length < 12) {
		let countOfZeros = 12 - buffer.length;
		for (let index = 0; index < countOfZeros; index++) {
			buffer = '0' + buffer;
		}
	}

	return Number(buffer.substr(2, 8));
}

export function getSeedDigit(from: number, to: number): number {
	return Math.floor(Math.random() * (to - from + 1)) + from;
}

export const reducers = {
	sum: function(accumulator: number, currentValue: number) {
		return accumulator + currentValue;
	},
	powSum: function(accumulator: number, currentValue: number) {
		return accumulator + currentValue ** 2;
	},
};
