import {
   countInIntervals,
   generateIntervals,
   normalizeToDraw,
} from './helpers.js';

export const drawRandomNumbers = async (ctx, data) => {
   const numbers = await normalizeToDraw(data);
   const chart = await new Chart(ctx, {
      type: 'bubble',
      data: {
         datasets: [
            {
               borderColor: 'red',
               data: numbers,
            },
         ],
      },
      options: {
         animation: {
            duration: 0,
         },
         tooltips: {
            enabled: false,
         },
         hover: {
            mode: null,
         },
         legend: {
            display: false,
         },
         title: {
            display: false,
         },
         scales: {
            xAxes: [
               {
                  ticks: {
                     beginAtZero: true,
                     autoSkip: true,
                  },
               },
            ],
            yAxes: [
               {
                  ticks: {
                     beginAtZero: true,
                     autoSkip: true,
                  },
               },
            ],
         },
      },
   });

   return chart;
};

export const drawIntervalsBar = async (ctx, data, countOfIntervals) => {
   const interval = await generateIntervals(
      countOfIntervals,
      Math.min.apply(null, data),
      Math.max.apply(null, data),
   );
   const countIntervals = await countInIntervals(data, interval);
   const chart = await new Chart(ctx, {
      type: 'bar',
      data: {
         labels: interval.map((el) => el.toFixed(3)),
         datasets: [
            {
               data: countIntervals,
               borderWidth: 0.5,
               borderColor: 'red',
            },
            {
               type: 'line',
               data: countIntervals,
               borderColor: 'blue',
               borderWidth: 0.5,
               fill: false,
            },
         ],
      },
      options: {
         animation: {
            duration: 0,
         },
         legend: {
            display: false,
         },
      },
   });

   return chart;
};
