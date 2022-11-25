import { useRef, useState, useEffect } from "react";
import './ViewDetails.css'
import { useNavigate } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL ,SERVER_URL_TASK} from "../../Globals";

const ViewDetails = () => {
  const navigate = useNavigate()
  const { state } = useLocation();
const[project,setproject]=useState()
const[tasktitle,settasktitle]=useState()
const[status,setstatus]=useState()
  console.log("sdgsrtgtr", state.experience)
  let degree;
  let Specialization;
  let passingYear;
  let organization;
  let TotelExperience;
  let designation
  state.education.map(data => {
    console.log("edu", data.Degree)
    degree = data.Degree
    Specialization = data.Specialization
    passingYear = data.passingYear
  })
  state.experience.map(data => {
    console.log("experience", data.organization)
    designation = data.designation
    TotelExperience = data.TotelExperience
    organization = data.organization
  })
  const task = () => {
    let id=state.empID
    console.log('id',id)
    axios
    .get(SERVER_URL_TASK+`get-my-task?empID=${id}`)
      .then((res) => {
        // if(res.data.result === 0){
        //   alert('no pending leaves')
        //  }
        console.log('res',res.data.status)
     
           
            res.data.data.map(data=>{
              setstatus(data.status)
              console.log("dscdsc",data.status)
              setproject(data.project)
              settasktitle(data.tasktitle)

            })
        
      });
  };
  useEffect(() => {
    task()
  }, []);
  return (
    <div>
      <div class="wrapper">
        <div class="left">
          <img src={SERVER_URL + state.image} alt="user" width="100" />
          <h4>{state.empName}</h4>
          <p>EMPID : {state.empID}</p>
          <p>DOMAIN : {state.domain}</p>
        </div>
        <div class="right">
          <div class="info">
            <h3>Information</h3>
            <div class="info_data">
              <div class="data">
                <h4>Email</h4>
                <p>{state.email}</p>
              </div>
              <div class="data">
                <h4>Phone</h4>
                <p>{state.mobile}</p>
              </div>
              <div class="data">
                <h4>Gender</h4>
                <p>{state.gender}</p>
              </div>
            </div>
          </div>

          <div class="projects">
            <h3>Education</h3>
            <div class="projects_data">
              <div class="data">
                <h4>Degree</h4>
                <p>{degree}</p>
              </div>
              <div class="data">
                <h4>Specialization</h4>
                <p>{Specialization}</p>
              </div>
              <div class="data">
                <h4>passingYear</h4>
                <p>{passingYear}</p>
              </div>
            </div>
          </div>
          <div class="projects">
            <h3>Experience</h3>
            {
              state.experience.map((curElem, index) => {
                console.log("cur", curElem.organization)
                return (

                  <div class="projects_data">

                    <div class="data">
                      <h4>organization</h4>
                      <p>{curElem.organization}</p>
                    </div>
                    <div class="data">
                      <h4>designation</h4>
                      <p>{curElem.designation}</p>
                    </div>
                    <div class="data">
                      <h4>TotelExperience</h4>
                      <p>{curElem.TotelExperience}</p>
                    </div>
                  </div>

                )
              })
            }

          <div class="projects">
            <h3>Task</h3>
            <div class="projects_data">
              <div class="data">
                <h4>project</h4>
                <p>{project}</p>
              </div>
              <div class="data">
                <h4>tasktitle</h4>
                <p>{tasktitle}</p>
              </div>
              <div class="data">
                <h4>status</h4>
                <p>{status}</p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewDetails;