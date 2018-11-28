/*    
   Point estimations
*/
export const expectedValue = (data = []) =>
   data.reduce((res, value) => res + value) / data.length;

export const variance = (data = []) =>
   data.reduce((res, value) => res + value ** 2, 0) / data.length -
   expectedValue(data) ** 2;

export const sampleMean = (data = []) =>
   data.reduce((res, value) => res + value) / data.length;

export const sampleVariance = (data = []) =>
   data.reduce((res, value) => res + value ** 2, 0) / (data.length - 1) -
   sampleMean(data) ** 2;

/*    
   Interval estimations
*/
export const confidenceIntervalOfExpectedValue = (data = [], criticalValue) => {
   const [expected, deviation] = [sampleMean(data), Math.sqrt(variance(data))];
   const z = (criticalValue * deviation) / Math.sqrt(data.length - 1);

   return [expected - z, expected + z];
};

export const confidenceIntervalOfVariance = (data = [], min, max, n) => {
   const ns = n * sampleVariance(data);

   return [ns / min, ns / max];
};
