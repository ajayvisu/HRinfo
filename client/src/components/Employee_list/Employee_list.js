import React ,{useEffect,useState} from "react";
import './Employee_list.css'
import axios from "axios";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart, 
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";

const Employee_list = () => {
  const data = [
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

  return (
      <>
<div class="card text-center">
  <div class="card-header">
    Today
  </div>
  <ol class="list-group list-group-numbered">
    <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">Name</div>
    <div class="ms-2 me-5">designation</div>
    <div class="ms-2 me-5">Number</div>
    <div class="ms-2 me-5">EmployeeID</div>
    <div class="ms-2 me-5">Loginstatus</div>
    <div class="ms-2 me-5">Status</div>

    </li>
  </ol>

{
  emp ?
  emp.result.map((data,index)=>{
    return(<>
    <ol class="list-group list-group-numbered">
  <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">{index+1}, {data.empName} </div>
    </div>
    <div class="ms-2 me-5">
      {data.role}
    </div>
    <div class="ms-2 me-5">
      {data.mobile}
    </div>
    <div class="ms-2 me-5">
      {data.empID}
    </div>
    <div class="ms-2 me-5">
    {
        data.loginStatus == true ?
        <>
        <span className="badge bg-success rounded-pill">online</span>
        </> : <span className="badge bg-danger rounded-pill">Ofline</span>
      }
    </div>
    <div class="ms-2 me-5">
    <span className="badge bg-danger rounded-pill">failr</span>
    </div>
  </li>
</ol>
    </>)
  }) : ''
}

<div class="card-footer text-muted">
    Today
  </div>
</div>

     
      </>

  );
};

export default Employee_list;