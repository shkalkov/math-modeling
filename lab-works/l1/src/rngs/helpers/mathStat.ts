export const expectedValue = (array: number[]): number =>
	array.reduce((accumulator, currentValue) => accumulator + currentValue) /
	array.length;

export const variance = (array: number[]): number =>
	expectedValue(array) - expectedValue(array) ** 2;

export function correlation(x: number[], y: number[]): number {
	let expectedX = expectedValue(x);
	let expectedY = expectedValue(y);
	let dispX = 0;
	let dispY = 0;
	let cov = 0;
	for (let index = 0; index < x.length; index++) {
		cov += (x[index] - expectedX) * (y[index] - expectedY);
		dispX += Math.pow(x[index] - expectedX, 2);
		dispY += Math.pow(y[index] - expectedY, 2);
	}
	cov = cov / x.length;

	return cov / (Math.sqrt(dispX / x.length) * Math.sqrt(dispY / y.length));
}

// const getNumbersInInterval = (array: number[], interval: number) =>
// 	array.filter(number => number <= interval);
// export namespace MathStat {
// 	export function expecedValue(arr: number[], callback: any): number {
// 		let sum = arr.reduce(callback);
// 		return sum / arr.length;
// 	}

// 	export function variance(array: number[]): number {
// 		return (
// 			Helpers.expecedValue(array, Helpers.reducers.powSum) -
// 			expecedValue(array, Helpers.reducers.sum) ** 2
// 		);
// 	}

// 	export function correlation(x: number[], y: number[]): number {
// 		let expXY = 0;
// 		for (let index = 0; index < x.length; index++) {
// 			expXY = x[index] * y[index];
// 		}

// 		expXY = expXY / x.length;
// 		return (
// 			(expXY -
// 				expecedValue(x, Helpers.reducers.sum) *
// 					expecedValue(y, Helpers.reducers.sum)) /
// 			Math.sqrt(variance(x) * variance(y))
// 		);
// 	}
// }
