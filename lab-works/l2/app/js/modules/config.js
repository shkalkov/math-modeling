export const countOfDigits =
   +document.querySelector('#countOfDigits').value || 10000;

export const countOfIntervals =
   +document.querySelector('#countOfIntervals').value || 20;

export const chartsCtx = {
   randomNumbers: document.querySelector('#randomDigitsChart'),
   intervalsBar: document.querySelector('#bar'),
};

export const significanceLevel = 0.99;

export const degreesOfFreedom = 30;
