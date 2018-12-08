const drawRandomNumbers = async (ctx, dataNumbers, headers) => {
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

export default drawRandomNumbers;
