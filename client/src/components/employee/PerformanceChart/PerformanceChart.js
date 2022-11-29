// import React, { Component, useState, useEffect } from 'react';

// import Chart from 'react-apexcharts'
// import axios from 'axios';
// import './PerformanceChart.css'
// import { SERVER_URL_EMPLOYEE, SERVER_URL_LEAVE } from "../../Globals";

// const Performance = () => {

//   const [performance, setPerformance] = useState({

//     options: {
//       chart: {
//         id: "basic-bar"
//       },
//       xaxis: {
//         categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
//       }
//     },
//     series: [
//       {
//         name: "series-1",
//         data: [0, 0, 0, 0, 0]
//       }
//     ]
//   })



//   let duration = []

//   const workPerformance = () => {
//     axios.get(SERVER_URL_LEAVE + `performance-chart`).then(res => {
//       console.log('workperformance', res.data.result)
//       res.data.result.map(item => {
//         console.log('item', item.durationHours)
//         duration.push(item.durationHours)
//       })
//       setPerformance({ ...performance, series: [{ data: duration }] })
//     }).catch(err => {
//       console.log('err', err.message);
//     })
//   }
//   useEffect(() => {

//     workPerformance()
//   }, [])


//   return (
//     <div className="donut" style={{ padding: '210px' }}>
//       <div className="mixed-chart">
//         <Chart
//           options={performance.options}
//           series={performance.series}
//           type="bar"
//           width="600"
//         />
//       </div>
      
//     </div>
//   );

// }
// export default Performance;

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Bar } from '@ant-design/plots';

 const Performance = () => {
  const data = [
    {
      day: 'Monday',
      value: 38,
    },
    {
      day: 'Tuesday',
      value: 52,
    },
    {
      day: 'Wednesday',
      value: 61,
    },
    {
      day: 'Thursday',
      value: 145,
    },
    {
      day: 'Friday',
      value: 48,
    },
  ];
  const config = {
    data,
    xField: 'value',
    yField: 'day',
    seriesField: 'day ',
    legend: {
      position: 'top-left',
    },
  };
  return <Bar {...config} />;
};
export default Performance;
// ReactDOM.render(<DemoBar />, document.getElementById('container'));