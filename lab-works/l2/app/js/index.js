// @ts-nocheck
import config from './config.js';
import { drawRandomNumbers } from './charts.js';

(function() {
   const currentData = 4;

   function createTable(tableData) {
      const table = document.createElement('table');
      const tableBody = document.createElement('tbody');

      tableData.forEach((rowData) => {
         const row = document.createElement('tr');

         rowData.forEach((cellData) => {
            const cell = document.createElement('td');
            cell.appendChild(document.createTextNode(cellData));
            row.appendChild(cell);
         });

         tableBody.appendChild(row);
      });

      table.appendChild(tableBody);
      document.body.appendChild(table);
   }

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

   const expectedValue = (x) => {
      let value = 0;
      const buffer = [].concat(...x);
      for (let index = 0; index < buffer.length / 2; index += 1) {
         value += buffer[index] * buffer[index + buffer.length / 2];
      }

      return value;
   };

   const variance = (x) => {
      let value = 0;
      const buffer = [].concat(...x);
      for (let index = 0; index < buffer.length / 2; index += 1) {
         value += buffer[index] ** 2 * buffer[index + buffer.length / 2];
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

   const conditionalProbabilityDistribution1 = (data, probability) => {
      const matrix = [];
      for (let i = 0; i < probability.length; i++) {
         matrix.push([]);
         const element = probability[i];

         for (let j = 0; j < data[0].length; j++) {
            matrix[i].push(data[j][i] / element);
         }
      }

      return matrix;
   };

   const conditionalProbabilityDistribution2 = (data, probability) => {
      const matrix = [];
      for (let i = 0; i < probability.length; i++) {
         matrix.push([]);
         const element = probability[i];

         for (let j = 0; j < data[0].length; j++) {
            matrix[i].push(data[i][j] / element);
         }
      }

      return matrix;
   };

   const start = (obj) => {
      try {
         const [data] = [obj.data];
         const res = Object.values(obj.headers);

         // createTable(data);

         console.table(data);

         const check = [].concat(...data).reduce((a, b) => a + b);

         console.log(check);

         const rowProbability = rowSum(data);
         const columnProbability = columnSum(obj.data);
         console.log(`X probability: ${rowProbability}`);
         console.log(`Y probability: ${columnProbability}`);

         const headersLine = [obj.headers.x, obj.headers.y];
         const dataLine = [].concat(...data);

         const x = normalizeDistributionRange(headersLine[1], rowProbability);
         const y = normalizeDistributionRange(
            headersLine[0],
            columnProbability,
         );

         const xExpectedValue = expectedValue(x);
         const yExpectedValue = expectedValue(y);

         const xVariance = variance(x);
         const yVariance = variance(y);

         const correlation = correlation2(headersLine, dataLine, y, x);

         console.log(`x exp : ${xExpectedValue}`);
         console.log(`y exp : ${yExpectedValue}`);

         console.log(`x var : ${xVariance}`);
         console.log(`y var : ${yVariance}`);
         console.log(`correlation : ${correlation}`);

         console.table(
            conditionalProbabilityDistribution1(data, columnProbability),
         );

         console.table(
            conditionalProbabilityDistribution2(data, rowProbability),
         );

         drawRandomNumbers('rowProb', rowProbability, res[1]);
         drawRandomNumbers('colProb', columnProbability, res[0]);
      } catch (error) {
         console.log(error.stack);
      }
   };

   start(config.randomVariables[currentData]);

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
