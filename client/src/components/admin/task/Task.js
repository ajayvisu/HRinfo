import React, {Component,useState,useEffect} from 'react';
import axios from 'axios'
import './Task.css'
import {SERVER_URL_TASK} from '../../Globals';

import { useNavigate } from "react-router-dom";

const Task =()=>  {
  const navigate=useNavigate()
const [tasks,setTask]=useState({
    tasktitle:'',
    empID:'',
    empName:'',
    describe:'',
    project:''
})
const handleChange = e => {
    const { name, value } = e.target
    setTask({
        ...tasks,
        [name]: value
    })
    // console.log(tasks)
}
    const task=()=>{
        const {tasktitle,empID,empName,describe,project}=tasks
     axios.post(`http://localhost:4000/api/v5/task/task-asign-to-emp`,tasks).then(data=>{
console.log('taskdata',data)
        }).catch(error=>{
          console.log('error',error)
        })
    }

return(
    <>
    <form className='task'>
  {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
  <div className="row mb-4">
    <div className="col">
      <div className="form-outline">
        <input type="text" name='empName' value={tasks.empName} onChange={handleChange} id="form6Example1" className="form-control" />
        <label className="form-label" for="form6Example1">EmployeeName</label>
      </div>
    </div>
    <div className="col">
      <div className="form-outline">
        <input type="text" id="form6Example2"name="empID" value={tasks.empID} onChange={handleChange} className="form-control" />
        <label className="form-label" for="form6Example2">EmployeeID</label>
      </div>
    </div>
  </div>

  {/* <!-- Text input --> */}
  <div className="form-outline mb-4">
    <input type="text" id="form6Example3" name='tasktitle' value={tasks.tasktitle} onChange={handleChange} className="form-control" />
    <label className="form-label" for="form6Example3">tasktitle</label>
  </div>

  {/* <!-- Text input --> */}
  <div className="form-outline mb-4">
    <input type="text" id="form6Example4" name='project' value={tasks.project} onChange={handleChange} className="form-control" />
    <label className="form-label" for="form6Example4">project</label>
  </div>

  

  {/* <!-- Message input --> */}
  <div className="form-outline mb-4">
    <textarea className="form-control" id="form6Example7" name='describe' value={tasks.describe} onChange={handleChange} rows="4"></textarea>
    <label className="form-label" for="form6Example7">describe</label>
  </div>

{/* 
  <!-- Submit button --> */}
  <button type="button" className="btn btn-success btn-block mb-4" onClick={task}>
   submit
  </button>
  <button style={{marginLeft:"30px"}} className="btn btn-primary  btn-block mb-4" onClick={()=>navigate('/alltask')}>
  ALLTaskDetails
  </button>
</form>

    </>
)

 
}

export default Task;