import { getSeedDigit, getMiddleOfNumber } from '../helpers/helpers';
import RNG from './rng';

export class MiddleSquare extends RNG {
	private seed: number;
	constructor(seed: number) {
		super();
		this.seed = seed || getSeedDigit(100000, 999999);
	}

	generate(count: number) {
		for (let index = 0, randomNumber = this.seed; index < count; index += 1) {
			randomNumber = getMiddleOfNumber(randomNumber ** 2);
			this.randomNumbers.push(randomNumber / 100000000);
		}

		return this.randomNumbers;
	}
}
