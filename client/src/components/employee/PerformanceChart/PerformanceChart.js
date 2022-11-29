import React, { Component, useState, useEffect } from 'react';
import Chart from 'react-apexcharts'
import axios from 'axios';
import './PerformanceChart.css'
import { SERVER_URL_EMPLOYEE, SERVER_URL_LEAVE } from "../../Globals";

const Performance = () => {
const [day,setDay]=useState([])
  const [performance, setPerformance] = useState({

    // options: {
    //   chart: {
    //     id: "basic-bar"
    //   },
    //   xaxis: {
    //     categories: []
    //   }
    // },
    series: [
      {
        name: "series-1",
        data: [0, 0, 0, 0, 0]
      }
    ]
  })



  let duration = []

  const workPerformance = () => {
    let id = localStorage.getItem('user_id')
    axios.get(SERVER_URL_LEAVE + `performance-chart?id=${id}`).then(res => {
      console.log('workperformance', res.data.day
      )
setDay(res.data.day)
      res.data.totalWorkingHours.map(item => {
        console.log('item', item)
        duration.push(item)
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
           options={{
            chart: {
              id: 'apexchart-example'
            },
            xaxis: {
              categories: day
            }
          }} 
          series={performance.series}
          type="bar"
          width="600"
        />
      </div>
      
    </div>
  );

}
export default Performance;
