import { useRef, useState, useEffect } from "react";
import './ViewDetails.css'
import { useNavigate } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
const ViewDetails = () => {
  const navigate = useNavigate()
  const { state } = useLocation();
  console.log("sdgsrtgtr", state)

  useEffect(() => {

  }, []);
  return (
    <div>
      <div class="wrapper">
        <div class="left">
          <img src="https://i.imgur.com/cMy8V5j.png" alt="user" width="100" />
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
                <h4></h4>
                <p>xyz</p>
              </div>
              <div class="data">
                <h4>xyz</h4>
                <p>xyz</p>
              </div>
            </div>
          </div>
          <div class="projects">
            <h3>Experience</h3>
            <div class="projects_data">
              <div class="data">
                <h4>xyyz</h4>
                <p>xyz</p>
              </div>
              <div class="data">
                <h4>xyz</h4>
                <p>xyz</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
export default ViewDetails;