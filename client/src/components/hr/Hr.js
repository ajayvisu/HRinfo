import React from "react";
import "./Hr.css";

const Hr = () => {
  return (

    <>
      <img className="hr_bg_img" src="hr_bg.webp" alt="hr_bg_image"></img>
      <img className="logo_img" src="logo.jpg" alt="hrinfo logo"></img>
      <div className="hr_bt container mt-4">
        <div className="row">
          <div className="col-lg-6 col-sm-6 col-12 mx-auto">
            <div className="row gy-4">
              <div className="col-sm-6 col-8 mx-auto">
                <a href="/hr">
                  <button className="btn firstbtn1 w-100 py-4">HR</button>
                </a>
              </div>
              <div className="col-sm-6 col-8 mx-auto">
                <a href="/emp">
                  <button className="btn firstbtn2 w-100 py-4">EMPLOYEE</button>
                </a>
              </div>
              <div className="col-sm-6 col-8 mx-auto">
                <a href="/mgmt">
                  <button className="btn firstbtn1 w-100 py-4">
                    MANAGEMENT
                  </button>
                </a>
              </div>
              <div className="col-sm-6 col-8 mx-auto">
                <a href="/maint">
                  <button className="btn firstbtn2 w-100 py-4">
                    MAINTANANCE
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  

  </>
  )
}

export default Hr;
