// import {
//    countInIntervals,
//    generateIntervals,
//    normalizeToDraw,
// } from './helpers.js';

export const drawRandomNumbers = async (ctx, dataNumbers, headers) => {
   const chart = await new Chart(ctx, {
      type: 'line',
      data: {
         labels: headers,
         datasets: [
            {
               label: `${ctx}`,
               data: dataNumbers,
               borderColor: 'blue',
               fill: null,
               // cubicInterpolationMode: 'monotone',
               lineTension: 0,
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

// export const drawIntervalsBar = async (ctx, data, countOfIntervals) => {
//    const interval = await generateIntervals(
//       countOfIntervals,
//       Math.min.apply(null, data),
//       Math.max.apply(null, data),
//    );
//    const countIntervals = await countInIntervals(data, interval);
//    const chart = await new Chart(ctx, {
//       type: 'bar',
//       data: {
//          labels: interval.map((el) => el.toFixed(3)),
//          datasets: [
//             {
//                data: countIntervals,
//                borderWidth: 0.5,
//                borderColor: 'red',
//             },
//             {
//                type: 'line',
//                data: countIntervals,
//                borderColor: 'blue',
//                borderWidth: 0.5,
//                fill: false,
//             },
//          ],
//       },
//       options: {
//          animation: {
//             duration: 0,
//          },
//          legend: {
//             display: false,
//          },
//       },
//    });

//    return chart;
// };
