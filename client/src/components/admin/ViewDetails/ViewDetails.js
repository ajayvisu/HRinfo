import { useRef, useState, useEffect } from "react";
import './ViewDetails.css'
import { useNavigate } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
const ViewDetails = () => {
  const navigate = useNavigate()
  const { state } = useLocation();
  const { states } = useLocation();
  console.log("sdgsrtgtr", state.experience)
  let degree;
  let Specialization;
  let passingYear;
  let organization;
  let TotelExperience;
  let designation
  state.education.map(data=>{
    console.log("edu", data.Degree)
    degree = data.Degree
    Specialization = data.Specialization
    passingYear = data.passingYear
  })
  state.experience.map(data=>{
    console.log("edu", data.TotelExperience)
    designation = data.designation
    TotelExperience = data.TotelExperience
    organization = data.organization
  })
  useEffect(() => {

  }, []);
  return (
    <div>
      <div class="wrapper">
        <div class="left">
          <img src={"http://localhost:4000/" + state.image} alt="user" width="100" />
          <h4>{state.empName}</h4>
          <p>EMPID : {state.empID}</p>
          <p>DOMAIN : UI Developer</p>
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
            <div class="projects_data">
              
              <div class="data">
                <h4>organization</h4>
                <p>{organization}</p>
              </div>
              <div class="data">
                <h4>designation</h4>
                <p>{designation}</p>
              </div>
              <div class="data">
                <h4>TotelExperience</h4>
                <p>{TotelExperience}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
export default ViewDetails;