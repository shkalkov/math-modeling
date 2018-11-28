const l2 = (function(exports) {
   const expectedValue = (data) =>
      data.reduce((res, value) => res + value) / data.length;

   const variance = (data) => expectedValue(data) - expectedValue(data) ** 2;

   const correlation = (x, y) => {
      const expectedX = expectedValue(x);
      const expectedY = expectedValue(y);
      let dispX = 0;
      let dispY = 0;
      let cov = 0;
      for (let index = 0; index < x.length; index += 1) {
         cov += (x[index] - expectedX) * (y[index] - expectedY);
         dispX += Math.pow(x[index] - expectedX, 2);
         dispY += Math.pow(y[index] - expectedY, 2);
      }
      cov /= x.length;
      return cov / (Math.sqrt(dispX / x.length) * Math.sqrt(dispY / y.length));
   };

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
         return (
            this.randomNumbers.reduce(
               (accumulator, currentValue) =>
                  accumulator + Math.pow(currentValue, 2),
            ) /
               this.randomNumbers.length -
            Math.pow(this.expectedValue(), 2)
         );
      }

      arrayIndexesExpValue() {
         return (
            (this.randomNumbers.length * (this.randomNumbers.length + 1)) /
            2 /
            this.randomNumbers.length
         );
      }

      covariation() {
         const indexExp = this.arrayIndexesExpValue();
         const valueExp = this.expectedValue();
         let cov = 0;
         for (let index = 0; index < this.randomNumbers.length; index += 1) {
            cov += (index - indexExp) * (this.randomNumbers[index] - valueExp);
         }
         return cov;
      }
   }

   function getMiddleOfNumber(number) {
      let buffer = number.toString();
      if (buffer.length < 12) {
         const countOfZeros = 12 - buffer.length;
         for (let index = 0; index < countOfZeros; index += 1) {
            buffer = `0${buffer}`;
         }
      }
      return Number(buffer.substr(2, 8));
   }

   function getSeedDigit(from, to) {
      return Math.floor(Math.random() * (to - from + 1)) + from;
   }
   const reducers = {
      sum(accumulator, currentValue) {
         return accumulator + currentValue;
      },
      powSum(accumulator, currentValue) {
         return accumulator + Math.pow(currentValue, 2);
      },
   };
   const sumRandom = (count) => {
      let element = 0;
      for (let index = 0; index < count; index += 1) {
         element += Math.random();
      }
      return element;
   };

   class Normal extends RNG {
      constructor(mi, sigma, n) {
         super();
         this.mi = mi;
         this.sigma = sigma;
         this.n = n;
      }

      generate(count) {
         for (let index = 0; index < count; index += 1) {
            this.randomNumbers.push(
               this.mi +
                  this.sigma *
                     Math.sqrt(12 / this.n) *
                     (sumRandom(this.n) - this.n / 2),
            );
         }
         return this.randomNumbers;
      }

      // distribute(mi, sigma, n) {
      //    if (this.randomNumbers) {
      //       this.randomNumbers.map(
      //          (element) =>
      //             mi + sigma * Math.sqrt(12 / n) * (sumRandom(n) - n / 2),
      //       );
      //    }
      //    return this.randomNumbers;
      // }
   }

   exports.Normal = Normal;
   exports.getMiddleOfNumber = getMiddleOfNumber;
   exports.getSeedDigit = getSeedDigit;
   exports.reducers = reducers;
   exports.sumRandom = sumRandom;
   exports.expectedValue = expectedValue;
   exports.variance = variance;
   exports.correlation = correlation;

   return exports;
})({});
