// @ts-nocheck
(function() {
   const config = {
      randomVariables: [
         {
            headers: {
               x: [1, 2],
               y: [10, 20],
            },
            data: [[0.5, 0.15], [0.22, 0.13]],
         },
         {
            headers: {
               x: [1, 2, 3, 4],
               y: [10, 20, 30, 40],
            },
            data: [
               [0, 0.11, 0.12, 0.03],
               [0, 0.13, 0.09, 0.02],
               [0.02, 0.11, 0.08, 0.01],
               [0.03, 0.11, 0.05, 0.09],
            ],
            check: [132.95, 0.6418, -0.00736],
         },
         {
            headers: {
               x: [1, 2, 3, 4, 5],
               y: [10, 20, 30, 40, 50],
            },
            data: [
               [0.02, 0.04, 0, 0, 0],
               [0, 0.06, 0.03, 0, 0],
               [0, 0, 0.06, 0.45, 0.04],
               [0, 0, 0.02, 0.08, 0.06],
               [0, 0, 0, 0.04, 0.1],
            ],
         },
         {
            headers: {
               x: [1, 2, 3, 4, 5],
               y: [10, 20, 30, 40, 50],
            },
            data: [
               [0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0],
               [0, 0, 0, 0.45, 0],
               [0, 0.55, 0, 0, 0],
               [0, 0, 0, 0, 0],
            ],
         },
         {
            headers: {
               x: [1, 2, 3, 4],
               y: [10, 20, 30, 40, 50],
            },
            data: [
               [0, 0, 0, 0],
               [0, 0, 0, 0],
               [0, 0, 0, 0.45],
               [0, 0.55, 0, 0],
               [0, 0, 0, 0],
            ],
         },
      ],
   };

   const numberNormalise = (number) => +parseFloat(number).toPrecision(12);

   const rowSum = (data = []) => {
      const P = [];
      data.forEach((element) => {
         P.push(numberNormalise(element.reduce((a, b) => a + b)));
      });

      return P;
   };

   const columnSum = (data = []) => {
      const P = [];
      const rowCount = data.length;
      const columnCount = data[rowCount - 1].length;

      if (rowCount === columnCount) {
         for (let iRow = 0; iRow < data.length; iRow += 1) {
            let sum = 0;

            for (let iColumn = 0; iColumn < data[iRow].length; iColumn += 1) {
               sum += data[iColumn][iRow];
            }

            P.push(numberNormalise(sum));
         }
      }

      return P;
   };

   const normalizeDistributionRange = (x, p) => [x, p];

   // const statValues = (data) => {
   //    // const values = [(expectedValue = 0), (variance = 0), (sigma = 0)];
   //    const values = {
   //       expectedValue: 0,
   //       variance: 0,
   //       sigma: 0,
   //    };
   //    const buf = [].concat(...data);
   //    for (let index = 0; index < buf.length / 2; index += 1) {
   //       values.expectedValue += buf[index] * buf[index + buf.length / 2];
   //       values.variance += buf[index] ** 2 * buf[index + buf.length / 2];
   //    }

   //    values.variance -= values.expectedValue ** 2;

   //    values.sigma = Math.sqrt(values.variance);

   //    return values;
   // };

   // const correlation = (x, y, data, mx, my) => {
   //    const headers = [x, y];
   //    const dataLine = [].concat(...data);
   //    let sum = 0;
   //    let i = 0;
   //    for (let j = 0; j < headers[0].length; j += 1) {
   //       for (let k = 0; k < headers[1].length; k += 1) {
   //          sum += dataLine[i] * headers[1][j] * headers[0][k];
   //          i += 1;
   //       }
   //    }

   //    return numberNormalise(sum - mx * my);
   // };

   const expectedValue = (x) => {
      let value = 0;
      const buf = [].concat(...x);
      for (let index = 0; index < buf.length / 2; index += 1) {
         value += buf[index] * buf[index + buf.length / 2];
      }

      return value;
   };

   const variance = (x) => {
      let value = 0;
      const buf = [].concat(...x);
      for (let index = 0; index < buf.length / 2; index += 1) {
         value += buf[index] ** 2 * buf[index + buf.length / 2];
      }

      return value - expectedValue(x) ** 2;
   };

   const correlation2 = (headers, data, x, y) => {
      // const headersLine = [...headers];
      const dataLine = data;

      let sum = 0;
      let i = 0;
      for (let j = 0; j < headers[0].length; j += 1) {
         for (let k = 0; k < headers[1].length; k += 1) {
            sum += dataLine[i] * headers[1][j] * headers[0][k];
            i += 1;
         }
      }

      return numberNormalise(
         (sum - expectedValue(x) * expectedValue(y)) /
            (Math.sqrt(variance(x)) * Math.sqrt(variance(y))),
      );
   };

   const start = (obj) => {
      try {
         const [data] = [obj.data];

         console.table(data);

         const check = [].concat(...data).reduce((a, b) => a + b);

         console.log(check);

         const rowProbability = rowSum(data);
         const columnProbability = columnSum(obj.data);

         const headersLine = [obj.headers.x, obj.headers.y];
         const dataLine = [].concat(...data);

         const x = normalizeDistributionRange(headersLine[1], rowProbability);
         const y = normalizeDistributionRange(
            headersLine[0],
            columnProbability,
         );

         const xVariance = variance(x);
         const yVariance = variance(y);

         const correlation = correlation2(headersLine, dataLine, y, x);
         console.log(xVariance);
         console.log(yVariance);
         console.log(correlation);
      } catch (error) {
         console.log(error.stack);
      }
   };

   start(config.randomVariables[1]);

   // const start = () => {
   //    const headers = config.randomVariables[0].headers;
   //    const headerX = config.randomVariables[0].headers.x;
   //    const headerY = config.randomVariables[0].headers.y;
   //    const data = config.randomVariables[0].data;

   //    const headersLine = [headerX, headerY];

   //    const dataLine = [].concat(...data);

   //    console.log(
   //       correlation2(
   //          headersLine,
   //          dataLine,
   //          normalizeDistributionRange(
   //             config.randomVariables[0].headers.y,
   //             rowSum(config.randomVariables[0].data),
   //          ),
   //          normalizeDistributionRange(
   //             config.randomVariables[0].headers.x,
   //             columnSum(config.randomVariables[0].data),
   //          ),
   //       ),
   //    );

   //    // console.log(
   //    //    correlation(
   //    //       headerX,
   //    //       headerY,
   //    //       dataLine,
   //    //       statValues(
   //    //          normalizeDistributionRange(
   //    //             config.randomVariables[0].headers.y,
   //    //             calculateRowDistributonRange(config.randomVariables[0].data),
   //    //          ),
   //    //       ).expectedValue,
   //    //       statValues(
   //    //          normalizeDistributionRange(
   //    //             config.randomVariables[0].headers.x,
   //    //             calculateColumnDistributonRange(
   //    //                config.randomVariables[0].data,
   //    //             ),
   //    //          ),
   //    //       ).expectedValue,
   //    //    ),
   //    // );

   //    // console.log(
   //    //    statValues(
   //    //       normalizeDistributionRange(
   //    //          config.randomVariables[0].headers.y,
   //    //          rowSum(config.randomVariables[0].data),
   //    //       ),
   //    //    ),
   //    // );

   //    // console.log(
   //    //    statValues(
   //    //       normalizeDistributionRange(
   //    //          config.randomVariables[0].headers.x,
   //    //          columnSum(config.randomVariables[0].data),
   //    //       ),
   //    //    ),
   //    // );

   //    // console.table(
   //    //    calculateRowDistributonRange(config.randomVariables[0].data),
   //    // );
   //    // console.log(calculateColumnDistributonRange(config.data));
   //    // const a = normalizeDistributionRange(
   //    //    config.randomVariables[0].headers.x,
   //    //    calculateColumnDistributonRange(config.randomVariables[0].data),
   //    // );

   //    // console.table(statValues(config.randomVariables[0].data));

   //    // const check = [].concat(...config.data).reduce((a, b) => a + b);
   //    // console.log(check);
   // };

   // start();

   // window.onload = () => {};
})();
