import RNG from '../rngs/rng/rng';
import { sumRandom } from '../helpers/helpers';

export class Normal extends RNG {
    private mi: number;
    private sigma: number;
    private n: number;
    constructor(mi, sigma, n) {
        super();
        this.mi = mi;
        this.sigma = sigma;
        this.n = n;
    }

    generate(count) {
        for (let index = 0; index < count; index++) {
            this.randomNumbers.push(
                this.mi +
                    this.sigma *
                        Math.sqrt(12 / this.n) *
                        (sumRandom(this.n) - this.n / 2)
            );
        }
        return this.randomNumbers;
    }

    distribute(mi: number, sigma: number, n: number): number[] {
        if (this.randomNumbers) {
            this.randomNumbers.map(
                (element) =>
                    (element =
                        mi + sigma * Math.sqrt(12 / n) * (sumRandom(n) - n / 2))
            );
        }

        return this.randomNumbers;
    }
}
