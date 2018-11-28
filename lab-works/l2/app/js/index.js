// @ts-nocheck
import {
   chartsCtx,
   countOfDigits,
   countOfIntervals,
   degreesOfFreedom,
   significanceLevel,
} from './modules/config.js';
import {
   confidenceIntervalOfExpectedValue as cioev,
   confidenceIntervalOfVariance as ciov,
   expectedValue,
   sampleMean,
   sampleVariance,
   variance,
} from './modules/statValues.js';
import { drawIntervalsBar, drawRandomNumbers } from './modules/charts.js';

const calculateStatValues = async (data) => {
   const expectedVal = await expectedValue(data.randomNumbers);
   const varn = await variance(data.randomNumbers);

   const confIntEV = await cioev(data.randomNumbers, 1.96);
   const confIntV = await ciov(data.randomNumbers, 43.8, 18.49, 30);

   const sampleMn = await sampleMean(data.randomNumbers);
   const sampleVar = await sampleVariance(data.randomNumbers);

   document.querySelector('#expected').innerHTML = expectedVal.toFixed(7);
   document.querySelector('#variance').innerHTML = varn.toFixed(7);
   document.querySelector('#sko').innerHTML = Math.sqrt(varn).toFixed(7);

   document.querySelector('#cievmin').innerHTML = confIntEV[0].toFixed(5);
   document.querySelector('#cievmax').innerHTML = confIntEV[1].toFixed(5);

   document.querySelector('#civmin').innerHTML = confIntV[0].toFixed(5);
   document.querySelector('#civmax').innerHTML = confIntV[1].toFixed(5);

   document.querySelector('#sampleMean').innerHTML = sampleMn;
   document.querySelector('#sampleVariance').innerHTML = sampleVar;
};

(function() {
   window.onload = () => {
      try {
         const nrl = new l2.Normal(0, 0.5, 12);
         nrl.generate(countOfDigits);

         Promise.all([
            drawRandomNumbers(chartsCtx.randomNumbers, nrl.randomNumbers),
            drawIntervalsBar(
               chartsCtx.intervalsBar,
               nrl.randomNumbers,
               countOfIntervals,
            ),
            calculateStatValues(nrl),
         ]);
      } catch (error) {
         console.log(`${error} \n ${error.stack}`);
      }
   };

   document.querySelector('#btn-generate').addEventListener('click', () => {
      window.location.reload();
   });
})();
