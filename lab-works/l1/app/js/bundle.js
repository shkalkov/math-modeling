var l1 = (function (exports) {
	'use strict';

	const expectedValue = (array) => array.reduce((accumulator, currentValue) => accumulator + currentValue) /
	    array.length;

	class RNG {
	    constructor() {
	        this._randomNumbers = [];
	    }
	    get randomNumbers() {
	        return this._randomNumbers;
	    }
	    set randomNumbers(randomDigit) {
	        this._randomNumbers = randomDigit;
	    }
	    clear() {
	        this.randomNumbers = [];
	    }
	    expectedValue() {
	        return expectedValue(this.randomNumbers);
	    }
	    variance() {
	        return this.randomNumbers.reduce((accumulator, currentValue) => accumulator + Math.pow(currentValue, 2)) / this.randomNumbers.length - Math.pow(this.expectedValue(), 2);
	    }
	    arrayIndexesExpValue() {
	        return ((this.randomNumbers.length * (this.randomNumbers.length + 1)) /
	            2 /
	            this.randomNumbers.length);
	    }
	    covariation() {
	        let indexExp = this.arrayIndexesExpValue();
	        let valueExp = this.expectedValue();
	        let cov = 0;
	        for (let index = 0; index < this.randomNumbers.length; index++) {
	            cov += (index - indexExp) * (this.randomNumbers[index] - valueExp);
	        }
	        return cov;
	    }
	}

	class Congruential extends RNG {
	    constructor(seed, multiplier, modulo) {
	        super();
	        this.seed = seed || 2147483647;
	        this.multiplier = multiplier || 1103515245;
	        this.modulo = modulo || Math.pow(2, 24) - 1;
	    }
	    generate(count) {
	        for (let index = 0; index < count; index++) {
	            this.seed = (this.multiplier * this.seed) % this.modulo;
	            this.randomNumbers.push(this.seed / this.modulo);
	        }
	        return this.randomNumbers;
	    }
	}

	function getMiddleOfNumber(number) {
	    let buffer = number.toString();
	    if (buffer.length < 12) {
	        let countOfZeros = 12 - buffer.length;
	        for (let index = 0; index < countOfZeros; index++) {
	            buffer = '0' + buffer;
	        }
	    }
	    return Number(buffer.substr(2, 8));
	}
	function getSeedDigit(from, to) {
	    return Math.floor(Math.random() * (to - from + 1)) + from;
	}

	class MiddleSquare extends RNG {
	    constructor(seed) {
	        super();
	        this.seed = seed || getSeedDigit(100000, 999999);
	    }
	    generate(count) {
	        for (let index = 0, randomNumber = this.seed; index < count; index += 1) {
	            randomNumber = getMiddleOfNumber(Math.pow(randomNumber, 2));
	            this.randomNumbers.push(randomNumber / 100000000);
	        }
	        return this.randomNumbers;
	    }
	}

	exports.Congruential = Congruential;
	exports.MiddleSquare = MiddleSquare;

	return exports;

}({}));
