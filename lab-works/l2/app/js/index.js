// @ts-nocheck
(function() {
   const normalizeToDraw = (array = []) =>
      array.map((element, index) => ({
         x: index + 1,
         y: element.toFixed(3),
         r: 0.2,
      }));

   const generateIntervals = (quantityOfIntervals = 10, from = 0, to = 1) => {
      const arrayOfIntervals = [];
      const intervalStep = -(from - to) / quantityOfIntervals;
      let currentInterval = from;
      for (
         let step = 1;
         step <= quantityOfIntervals;
         step += 1, currentInterval += intervalStep
      ) {
         if (step !== 1) arrayOfIntervals.push(currentInterval);
      }
      arrayOfIntervals.push(currentInterval);

      return arrayOfIntervals;
   };

   const countInIntervals = (array, intervals) => {
      const arrayCopy = array.slice();
      const arr = [];
      let buff = 0;
      const arrayCopyLength = arrayCopy.length;
      for (let indx = 0; indx < intervals.length; indx += 1) {
         if (indx !== 0) arr.push(buff / arrayCopyLength);
         buff = 0;
         for (let index = 0; index < arrayCopyLength; index += 1) {
            if (arrayCopy[index] && arrayCopy[index] <= intervals[indx]) {
               buff += 1;
               delete arrayCopy[index];
            }
         }
      }

      arr.push(buff / arrayCopyLength);

      return arr;
   };

   const config = {
      countOfDigits: +document.querySelector('#countOfDigits').value || 10000,
      countOfIntervals:
         +document.getElementById('countOfIntervals').value || 20,
      chartsCtx: {
         randomNumbers: document.getElementById('randomDigitsChart'),
         intervalsBar: document.getElementById('bar'),
      },
   };

   const startObject = (obj) => new Promise((res) => res(obj));

   window.onload = () => {
      try {
         const promObject = new l2.Normal(0, 1, 12);
         promObject.generate(10000);

         /*          const intervals = generateIntervals(
            config.countOfIntervals,
            Math.min.apply(null, promObject.randomNumbers),
            Math.max.apply(null, promObject.randomNumbers),
         ); */

         /*          startObject(promObject.randomNumbers)
            .then((data) => normalizeToDraw(data))
            .then(
               (result) =>
                  new Chart(config.chartsCtx.randomNumbers, {
                     type: 'bubble',
                     data: {
                        datasets: [
                           {
                              borderColor: 'red',
                              data: result,
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
                  }),
            )
            .catch((error) => console.log(error));

         startObject(promObject.randomNumbers)
            .then((data) => countInIntervals(data, intervals))
            .then(
               (result) =>
                  new Chart(config.chartsCtx.intervalsBar, {
                     type: 'bar',
                     data: {
                        labels: intervals.map((el) => el.toFixed(3)),
                        datasets: [
                           {
                              data: result,
                              borderWidth: 0.5,
                              borderColor: 'red',
                           },
                           {
                              type: 'line',
                              data: result,
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
                  }),
            )
            .catch((error) => console.log(error)); */

         /*          const calculateStatValues = async (obj) => {
            await Promise.all([
               (document.querySelector(
                  '#expected',
               ).innerHTML = await obj.expectedValue().toFixed(5)),
               (document.querySelector(
                  '#variance',
               ).innerHTML = await obj.variance().toFixed(5)),
            ]);
         }; */

         const drawRandomNumbers = async (
            data,
            ctx = config.chartsCtx.randomNumbers,
         ) => {
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

         const drawIntervalsBar = async (data, ctx) => {
            const interval = await generateIntervals(
               config.countOfIntervals,
               Math.min.apply(null, promObject.randomNumbers),
               Math.max.apply(null, promObject.randomNumbers),
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

         Promise.all([
            drawRandomNumbers(
               promObject.randomNumbers,
               config.chartsCtx.randomNumbers,
            ),
            drawIntervalsBar(
               promObject.randomNumbers,
               config.chartsCtx.intervalsBar,
            ),
         ]);

         // calculateStatValues(promObject);

         /*          drawRandomNumbers(
            promObject.randomNumbers,
            config.chartsCtx.randomNumbers,
         );
         drawIntervalsBar(
            promObject.randomNumbers,
            config.chartsCtx.intervalsBar,
         ); */

         /*          document.querySelector(
            '#expected',
         ).innerHTML = promObject.expectedValue().toFixed(5);

         document.querySelector(
            '#variance',
         ).innerHTML = promObject.variance().toFixed(5); */

         document
            .querySelector('#btn-generate')
            .addEventListener('click', () => {
               window.location.reload();
            });

         // document
         //    .querySelec tor('#btn-generate')
         //    .addEventListener('click', () => {
         //       const countOfDigits = document.querySelector('#countOfDigits')
         //          .value;
         //       const cl = new l2.Normal(5, 2, 12);

         //       DATA = normalize(cl.generate(countOfDigits));

         //       document.querySelector(
         //          '#expected'
         //       ).innerHTML = cl.expectedValue().toFixed(5);
         //       document.querySelector(
         //          '#variance'
         //       ).innerHTML = cl.variance().toFixed(5);

         //       randomNumbersBubbleChart.data.datasets[0].data = DATA;

         //       randomNumbersBarChart.data.datasets[0].data = countInIntervals(
         //          cl.randomNumbers,
         //          intervals
         //       );

         //       randomNumbersBarChart.update();
         //       randomNumbersBubbleChart.update();
         //    })
      } catch (error) {
         console.log(`${error} \n ${error.stack}`);
      }
   };
})();
