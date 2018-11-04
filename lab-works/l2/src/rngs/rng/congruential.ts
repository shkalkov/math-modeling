import RNG from './rng';
export class Congruential extends RNG {
    private seed: number;
    private multiplier: number;
    private modulo: number;

    constructor(seed?: number, multiplier?: number, modulo?: number) {
        super();
        this.seed = seed || 2147483647;
        this.multiplier = multiplier || 1103515245;
        this.modulo = modulo || 2 ** 24 - 1;

    }

    generate(count: number) {
        for (let index = 0; index < count; index++) {
            this.seed = (this.multiplier * this.seed) % this.modulo;
            this.randomNumbers.push(this.seed / this.modulo);
        }

        return this.randomNumbers;
    }    
}
