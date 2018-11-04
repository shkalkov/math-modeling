import { expectedValue } from '../../helpers/mathStat';

/**
 * @class RNG - random number generator
 */
export default abstract class RNG {
    private _randomNumbers: number[] = [];

    public get randomNumbers(): number[] {
        return this._randomNumbers;
    }

    public set randomNumbers(randomDigit: number[]) {
        this._randomNumbers = randomDigit;
    }

    clear(): void {
        this.randomNumbers = [];
    }
    abstract generate(count: number): number[];

    expectedValue(): number {
        return expectedValue(this.randomNumbers);
    }

    variance(): number {
        return (
            this.randomNumbers.reduce(
                (accumulator, currentValue) => accumulator + currentValue ** 2
            ) /
                this.randomNumbers.length -
            this.expectedValue() ** 2
        );
    }

    arrayIndexesExpValue(): number {
        return (
            (this.randomNumbers.length * (this.randomNumbers.length + 1)) /
            2 /
            this.randomNumbers.length
        );
    }
    covariation(): number {
        let indexExp = this.arrayIndexesExpValue();
        let valueExp = this.expectedValue();
        let cov = 0;
        for (let index = 0; index < this.randomNumbers.length; index++) {
            cov += (index - indexExp) * (this.randomNumbers[index] - valueExp);
        }

        return cov;
    }
}
