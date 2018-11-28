export const expectedValue = (array: number[]): number =>
    array.reduce((accumulator, currentValue) => accumulator + currentValue) /
    array.length;

export const variance = (array: number[]): number =>
    expectedValue(array) - expectedValue(array) ** 2;

export const correlation = (x: number[], y: number[]): number => {
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
};