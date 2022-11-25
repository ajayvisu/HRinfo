import React, { Component, useState, useEffect } from 'react';
import Chart from 'react-apexcharts'
import axios from 'axios';
import './PerformanceChart.css'
import { SERVER_URL_EMPLOYEE, SERVER_URL_LEAVE } from "../../Globals";

const Performance = () => {

  const [performance, setPerformance] = useState({

    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
      }
    },
    series: [
      {
        name: "series-1",
        data: [0, 0, 0, 0, 0]
      }
    ]
  })



  let duration = []

  const workPerformance = () => {
    axios.get(SERVER_URL_LEAVE + `performance-chart`).then(res => {
      console.log('workperformance', res.data.result)
      res.data.result.map(item => {
        console.log('item', item.durationHours)
        duration.push(item.durationHours)
      })
      setPerformance({ ...performance, series: [{ data: duration }] })
    }).catch(err => {
      console.log('err', err.message);
    })
  }
  useEffect(() => {

    workPerformance()
  }, [])


  return (
    <div className="donut" style={{ padding: '210px' }}>
      <div className="mixed-chart">
        <Chart
          options={performance.options}
          series={performance.series}
          type="bar"
          width="600"
        />
      </div>
      
    </div>
  );

}
export default Performance;
