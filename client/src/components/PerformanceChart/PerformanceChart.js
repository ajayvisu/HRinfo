import React, { Component, useState, useEffect } from 'react';
import Chart from 'react-apexcharts'
import axios from 'axios';
import './PerformanceChart.css'
const Performance = () => {

  const [datas, setData] = useState({
    options: {
      labels: ['LoggedOut', 'LoggedIn']
    },
    series: [0,0],
    
    
  });
  const[loginStatus,setLoginStatus]=useState({
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49]
      }
    ]
  })
const loginUserStatus=()=>{
  axios.get('http://localhost:4000/api/emp/loginstatus').then(data => {
    let login = data.data.loginUsers / data.data.totalUsers * 100
    let  notLoginUsers = data.data.totalUsers - data.data.loginUsers
    let notlogin = notLoginUsers / data.data.totalUsers * 100
    console.log('notlogin',notlogin)
     setData({ ...datas, series: [ notlogin,login] })
     console.log('data',datas.series)
    }).catch(err => {
     console.log("err", err)
   })
}
const data1 = [
  { time: "09:00-11:00", work: 10 },
  { time: "11:00-01:00", work: 9 },
  { time: "02:00-04:00", work: 7 },
  { time: "04:00-03:00", work: 6 },
];

const [emp ,setEmp] = useState('');

const myEmployee = () =>{
axios.get('http://localhost:4000/api/emp/getEmployee').then(result=>{
  console.log('employee data ,', result.data)
  setEmp(result.data);
}).catch(err=>{
  console.log('err',err.message);
})
}
  useEffect(() => {
    loginUserStatus()
    myEmployee() 
  }, [])


  return (
    <div className="donut">

      
          <div className="mixed-chart">
            <Chart
              options={loginStatus.options}
              series={loginStatus.series}
              type="bar"
              width="600"
            />
      </div>
      <div className='pie'>
      <Chart options={datas.options} series={datas.series} type="donut" width="380" />
      </div>
      <div class="card">
    <h5 class="card-header">Work Log</h5>
      <div class="card-body">
        <div className="flex">
            <div className="work-log1">
            <span>{localStorage.getItem('name')}</span>
            <p>{localStorage.getItem('id')}</p>
            <span className="work_time">05:19:32</span>
            <p style={{fontSize:10,color:"red"}}>Total working time</p>
            
            </div>
            <div className="work-log2">
            <span>CLOCK IN TIME :</span>
            <p style={{color:'orange'}}>{localStorage.getItem('entryTime')}</p>
            <span>CLOCK OUT TIME :</span>
            <p style={{color:'red'}}> 00:00:00</p>
            </div>
        </div>
        <button type="button" className="btn btn-danger">Clock out</button>
      </div>
    </div>
    </div>
  );

}
export default Performance;
