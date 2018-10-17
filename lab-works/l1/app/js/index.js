(function() {
   const info = [];

   const normalize = array =>
      array.map((element, index) => ({
         x: index + 1,
         y: element.toFixed(2),
         r: 0.5
      }));

   const generateIntervals = (inter = 10) => {
      const arrInter = [];
      for (let index = 1; index <= inter; index++) {
         arrInter.push(index / inter);
      }
      return arrInter;
   };

   const countInIntervals = function(array, intervals) {
      const arrayCopy = array.slice();
      const arr = [];
      let buff = 0;
      const arrayCopyLength = arrayCopy.length;
      for (let indx = 0; indx < intervals.length; indx++) {
         if (indx !== 0) arr.push(buff / arrayCopyLength);
         buff = 0;
         for (let index = 0; index < arrayCopyLength; index++) {
            if (arrayCopy[index] && arrayCopy[index] <= intervals[indx]) {
               buff++;
               delete arrayCopy[index];
            }
         }
      }

      arr.push(buff / arrayCopyLength);

      return arr;
   };

   window.onload = function() {
      try {
         let countOfDigits =
            document.querySelector('#countOfDigits').value || 50000;
         countOfDigits = 10000;
         // const cg = new l.Congruential(null, 1664525, 2 ** 32);
         const cg = new l1.MiddleSquare();

         // const cg = new l.Congruential();

         const drawChart = function(type, ctx, data) {
            return new Chart(ctx, {
               type,
               data: {
                  datasets: [
                     {
                        borderColor: 'red',
                        data
                     }
                  ]
               },
               options: {
                  animation: {
                     duration: 0
                  },
                  tooltips: {
                     enabled: false
                  },
                  hover: { mode: null },
                  legend: {
                     display: false
                  },
                  title: {
                     display: false
                  },
                  scales: {
                     xAxes: [
                        {
                           ticks: {
                              beginAtZero: true,
                              autoSkip: true
                           }
                        }
                     ],
                     yAxes: [
                        {
                           ticks: {
                              beginAtZero: true,
                              stepSize: 0.1,
                              autoSkip: true
                           }
                        }
                     ]
                  }
               }
            });
         };

         let DATA = normalize(cg.generate(countOfDigits));

         const randomNumbersChartCtx = document.getElementById(
            'randomDigitsChart'
         );

         const randomNumbersBubbleChart = drawChart(
            'bubble',
            randomNumbersChartCtx,
            DATA
         );

         const ctxBar = document.getElementById('bar');
         const inter = generateIntervals(10);
         const countInInterval = countInIntervals(cg.randomNumbers, inter);

         const randomNumbersBarChart = new Chart(ctxBar, {
            type: 'bar',
            data: {
               labels: inter,
               datasets: [
                  {
                     label: 'Dataset 1',
                     borderColor: 'red',
                     borderWidth: 1,
                     data: countInInterval
                  }
               ]
            },
            options: {
               responsive: true,
               legend: {
                  display: false,
                  position: 'top'
               },
               title: {
                  display: false
               },
               scales: {
                  xAxes: [
                     {
                        stacked: true
                     }
                  ],
                  yAxes: [
                     {
                        stepSize: 2,
                        stacked: true
                     }
                  ]
               }
            }
         });

         document
            .querySelector('#btn-generate')
            .addEventListener('click', () => {
               countOfDigits = document.querySelector('#countOfDigits').value;
               const cg = new l1.MiddleSquare();

               DATA = normalize(cg.generate(countOfDigits));

               const variance = cg.variance().toFixed(5);
               const expectedValue = cg.expectedValue().toFixed(5);

               info.push({
                  seed: cg.seed,
                  multiplier: cg.multiplier,
                  modulo: cg.modulo,
                  varianc: variance,
                  expectedValu: expectedValue
               });

               document.querySelector('#expected').innerHTML = expectedValue;
               document.querySelector('#variance').innerHTML = variance;

               randomNumbersBubbleChart.data.datasets[0].data = DATA;

               randomNumbersBarChart.data.datasets[0].data = countInIntervals(
                  cg.randomNumbers,
                  inter
               );

               randomNumbersBarChart.update();
               randomNumbersBubbleChart.update();
            });

         const variance = cg.variance().toFixed(5);
         const expectedValue = cg.expectedValue().toFixed(5);

         info.push({
            seed: cg.seed,
            multiplier: cg.multiplier,
            modulo: cg.modulo,
            varianc: variance,
            expectedValu: expectedValue
         });

         document.querySelector(
            '#expected'
         ).innerHTML = cg.expectedValue().toFixed(5);
         document.querySelector('#variance').innerHTML = cg
            .variance()
            .toFixed(5);
         cg.clear();
      } catch (error) {
         console.log(`${error} \n ${error.stack}`);
      }
   };

   const table = new Vue({
      el: '#history',
      data: {
         rows: info
      }
   });
})();
