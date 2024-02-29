// // // import React from "react";
// // // import { Line } from "react-chartjs-2";

// // // const LineChart = ({ records }) => {
// // //   // Extract dates and metrics from records array
// // //   const dates = records.map((record) => record.prdate);
// // //   const metrics = records.map((record) => record.metric);

// // //   // Data for the chart
// // //   const data = {
// // //     labels: dates,
// // //     datasets: [
// // //       {
// // //         label: "Metric",
// // //         data: metrics,
// // //         fill: false,
// // //         borderColor: "rgb(75, 192, 192)",
// // //         tension: 0.1,
// // //       },
// // //     ],
// // //   };

// // //   // Options for the chart
// // //   const options = {
// // //     scales: {
// // //       x: {
// // //         title: {
// // //           display: true,
// // //           text: "Date",
// // //         },
// // //       },
// // //       y: {
// // //         title: {
// // //           display: true,
// // //           text: "Metric (kg)",
// // //         },
// // //       },
// // //     },
// // //   };

// // //   return <Line data={data} options={options} />;
// // // };

// // // export default LineChart;


// // import React from "react";
// // import { Line } from "react-chartjs-2";

// // const LineChart = ({ records }) => {
// //   // Extract dates and metrics from records array
// //   const dates = records.map((record) => record.prdate);
// //   const metrics = records.map((record) => record.metric);

// //   // Data for the chart
// //   const data = {
// //     labels: dates,
// //     datasets: [
// //       {
// //         label: "Metric",
// //         data: metrics,
// //         fill: false,
// //         borderColor: "rgb(75, 192, 192)",
// //         tension: 0.1,
// //       },
// //     ],
// //   };

// //   // Options for the chart
// //   const options = {
// //     scales: {
// //       x: {
// //         type: 'time', // Set the x-axis scale type to 'time'
// //         title: {
// //           display: true,
// //           text: "Date",
// //         },
// //       },
// //       y: {
// //         type: 'linear', // Set the y-axis scale type to 'linear' for numeric values
// //         title: {
// //           display: true,
// //           text: "Metric (kg)",
// //         },
// //       },
// //     },
// //   };

// //   return <Line data={data} options={options} />;
// // };

// // export default LineChart;


// import React from "react";
// import { Line } from "react-chartjs-2";

// const LineChart = ({ records }) => {
//   // Extract dates and metrics from records array
//   const dates = records.map((record) => new Date(record.prdate)); // Convert dates to JavaScript Date objects
//   const metrics = records.map((record) => record.metric);

//   // Data for the chart
//   const data = {
//     labels: dates,
//     datasets: [
//       {
//         label: "Metric",
//         data: metrics,
//         fill: false,
//         borderColor: "rgb(75, 192, 192)",
//         tension: 0.1,
//       },
//     ],
//   };

//   // Options for the chart
//   const options = {
//     scales: {
//       x: {
//         type: 'time', // Set the x-axis scale type to 'time'
//         time: { // Configure time options
//           unit: 'day', // Display dates by day
//           displayFormats: {
//             day: 'MMM DD', // Format for displaying dates
//           },
//         },
//         title: {
//           display: true,
//           text: "Date",
//         },
//       },
//       y: {
//         type: 'linear', // Set the y-axis scale type to 'linear' for numeric values
//         title: {
//           display: true,
//           text: "Metric (kg)",
//         },
//       },
//     },
//   };

//   return <Line data={data} options={options} />;
// };

// export default LineChart;


import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";

const LineChart = ({ records }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Destroy the previous chart when the component is unmounted
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  // Extract dates and metrics from records array
  const dates = records.map((record) => new Date(record.prdate)); // Convert dates to JavaScript Date objects
  const metrics = records.map((record) => record.metric);

  // Data for the chart
  const data = {
    labels: dates,
    datasets: [
      {
        label: "Metric",
        data: metrics,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  // Options for the chart
  const options = {
    scales: {
      x: {
        type: 'time', // Set the x-axis scale type to 'time'
        time: { // Configure time options
          unit: 'day', // Display dates by day
          displayFormats: {
            day: 'MMM DD', // Format for displaying dates
          },
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        type: 'linear', // Set the y-axis scale type to 'linear' for numeric values
        title: {
          display: true,
          text: "Metric (kg)",
        },
      },
    },
  };

  return <Line ref={chartRef} data={data} options={options} />;
};

export default LineChart;
