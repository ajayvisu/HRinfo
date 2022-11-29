import React, {Component,useState,useEffect} from 'react';
import axios from 'axios'
import './Task.css'
import {SERVER_URL_TASK} from '../../Globals';
import { SERVER_URL_EMPLOYEE, SERVER_URL } from "../../Globals";
import { useNavigate } from "react-router-dom";

const Task =()=>  {

const navigate=useNavigate();
const [data, setData] = useState([]);
const [getName,setName]  = useState ('');

const [tasks,setTask]=useState({
    tasktitle:'',
    empID:'',
    empName:'',
    describe:'',
    project:''
}) 
const getdata = () => {
     try {
       axios.get(SERVER_URL_EMPLOYEE + `getEmployee`).then(res => {
         console.log('employee', res.data.result)
         setData(res.data.result)
       }).catch(err => {
         console.log('err', err.message)
       })
     } catch (err) {
       console.log("error", err.message)
     }
   }
 
const handleChange = e => {
//     const { name, value } = e.target
//     setTask({
//         ...tasks,
//         [name]: value
//     })
    // console.log(tasks)
    const getName = e.target.value;
    setName(getName);

}


    const task=()=>{
        const {tasktitle,empID,empName,describe,project}=tasks
     axios.post(`http://localhost:4000/api/v5/task/task-asign-to-emp`,tasks).then(data=>{
console.log('taskdata',data)
        }).catch(error=>{
          console.log('error',error)
        })
    }

    useEffect(() => {
     getdata();
 }, []);

return(
    <>
    <form className='task'>
  {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
 
  <div className="cat-drop mb-4">
                            <label >Employee ID</label>
                            <select name="id" onChange={handleChange} className="form-control">
                              {data.map((data, index) => {
                                // console.log('data',data._id)
                                return (

                                  <option key={index} value={data.empName}>{data.empID}</option>

                                )
                              })}

                            </select>
                          </div>
      <div className="form-outline mb-4">
      <label className="form-label" for="form6Example1">EmployeeName</label>
        <input type="text" name='empName' value={getName} onChange={handleChange } id="form6Example1" className="form-control" />
        
      </div>
   

  {/* <!-- Text input --> */}
  <div className="form-outline mb-4">
  <label className="form-label" for="form6Example3">tasktitle</label>
    <input type="text" id="form6Example3" name='tasktitle' value={tasks.tasktitle} onChange={handleChange} className="form-control" />
   
  </div>

  {/* <!-- Text input --> */}
  <div className="form-outline mb-4">
  <label className="form-label" for="form6Example4">project</label>
    <input type="text" id="form6Example4" name='project' value={tasks.project} onChange={handleChange} className="form-control" />
    
  </div>

  

  {/* <!-- Message input --> */}
  <div className="form-outline mb-4">
  <label className="form-label" for="form6Example7">describe</label>
    <textarea className="form-control" id="form6Example7" name='describe' value={tasks.describe} onChange={handleChange} rows="4"></textarea>
    
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