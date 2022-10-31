import React, { useEffect, useState } from "react";
import "./Emp_dashbord.css";
import {PieChart,Pie,Tooltip,BarChart,XAxis,YAxis,Legend,CartesianGrid,Bar,} from "recharts";
import axios from "axios";



const Emp_dashbord = () =>{

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
 useEffect(()=>{
 myEmployee() 
 }, [])
    const data = [
        { day: "SUN", hour: 0 },
        { day: "MON", hour: 24 },
        { day: "TUE", hour: 10 },
        { day: "WED", hour: 12 },
        { day: "THU", hour: 8 },
        { day: "FRI", hour: 17 },
        { day: "SAT", hour: 8 },
      ];
 return(<>
<div classNameName="pro">
   <div className="row mb-4">
  <div className="col-sm-5 mb-3">
    <div className="card">
    <h5 className="card-header">Work Log</h5>
      <div className="card-body">
        <div classNameName="flex">
            <div classNameName="work-log1">
            <span>{localStorage.getItem('name')}</span>
            <p>{localStorage.getItem('id')}</p>
            <span classNameName="work_time">05:19:32</span>
            <p style={{fontSize:10,color:"red"}}>Total working time</p>
            
            </div>
            <div classNameName="work-log2">
            <span>CLOCK IN TIME :</span>
            <p style={{color:'orange'}}>{localStorage.getItem('entryTime')}</p>
            <span>CLOCK OUT TIME :</span>
            <p style={{color:'red'}}> 00:00:00</p>
            </div>
        </div>
        <button type="button" classNameName="btn btn-danger">Clock out</button>
      </div>
    </div>
  </div>
  <div className="col-sm-7">
    <div className="card">
    <h5 className="card-header">Work Time Statistics</h5>
      <div className="card-body ">
        <div classNameName="chart">
        <BarChart
          width={500}
          height={170}
          data={data}
          margin={{
            top: 10,
            right: 120,
            left: -10,
            bottom: 1,
          }}
          barSize={15}
          
        > 
          <XAxis
            dataKey="day"
            scale="point"
            padding={{ left: 10, right: 10 }}  
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="hour" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart></div>
      </div>
    </div>
  </div>
</div>
<div className="row mb-4">
  <div className="col-sm-3">
    <div className="card">
      <div className="flex">
        <div classNameName="project_num">
        <span>17</span><br></br>
        <p>Number of Project Assigned</p>
        </div>
        <img src="https://cdn1.iconfinder.com/data/icons/mobile-device/512/reload-loading-process-blue-round-512.png"/>
      </div>
    </div>
  </div>
  <div className="col-sm-3">
    <div className="card">
      <div className="flex">
        <div classNameName="project_num">
        <span>37</span><br></br>
        <p>Number of Project Complete</p>
        </div>
        <img src="https://cdn4.iconfinder.com/data/icons/colicon/24/checkmark_done_complete-512.png"/>
      </div>
    </div>
  </div>
  <div className="col-sm-3">
    <div className="card">
      <div className="flex">
        <div classNameName="project_num">
        <span>18</span><br></br>
        <p>Number of Project Process</p>
        </div>
        <img src="https://freepngimg.com/thumb/symbol/89661-and-clock-symbol-icons-computer-black-line.png"/>
      </div>
    </div>
  </div> 
  <div className="col-sm-3">
    <div className="card">
      <div className="flex">
        <div classNameName="project_num">
        <span>10</span><br></br>
        <p>Number of Project Pending</p>
        </div>
        <img src="https://static.thenounproject.com/png/3536576-200.png"/>
      </div>
    </div>
  </div>
</div>

<div className="card text-center">
  <div className="card-header">
    Today
  </div>

  <br></br><br></br>
 
  <div classNameName="flex">
        <BarChart
          width={400}
          height={200}
          data={data1}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="time"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="work" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
        <div classNameName="round">
     <PieChart width={400} height={400}>
          <Pie
            dataKey="work"
            isAnimationActive={false}
            data={data1}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </div>
    </div> 


  <div className="card-footer text-muted">
    Today
  </div>
</div>
</div>

 </>)   

}

export default Emp_dashbord;