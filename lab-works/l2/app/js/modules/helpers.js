export const normalizeToDraw = (data = []) =>
   data.map((element, index) => ({
      x: index + 1,
      y: element.toFixed(3),
      r: 0.2,
   }));

export const generateIntervals = (quantity = 10, from = 0, to = 1) => {
   const intervals = [];
   const step = -(from - to) / quantity;
   let interval = from;

   for (let index = 1; index <= quantity; index += 1, interval += step) {
      if (index !== 1) intervals.push(interval);
   }
   intervals.push(interval);

   return intervals;
};

export const countInIntervals = (array = [], intervals = []) => {
   const data = array.slice();
   const arr = [];
   let buff = 0;
   const dataLength = data.length;
   for (let indx = 0; indx < intervals.length; indx += 1) {
      if (indx !== 0) arr.push(buff / dataLength);
      buff = 0;
      for (let index = 0; index < dataLength; index += 1) {
         if (data[index] && data[index] <= intervals[indx]) {
            buff += 1;
            delete data[index];
         }
      }
   }

   arr.push(buff / dataLength);

   return arr;
};

export const drawConfidenceInterval = (data = []) => {};
