import React from 'react'

function Hr() {
  return (
  <div className="container mt-3">
    <div className="row">
      <div className="col-lg-4 col-sm-6 col-6 offset-lg-4 offset-sm-3 offset-3 ">
        <div className="row gy-3">
          <div className="col-md-6 col-12">
            <a href="/hr">
              <button className="btn firstbtn1 w-100 py-5">HR</button>
            </a>
          </div>
          <div className="col-md-6 col-12">
            <a href="/emp">
              <button className="btn firstbtn2 w-100 py-5">EMPLOYEE</button>
            </a>
          </div>
          <div className="col-md-6 col-12">
            <a href="/mgmt">
              <button className="btn firstbtn1 w-100 py-5">
                MANAGEMENT
              </button>
            </a>
          </div>
          <div className="col-md-6 col-12">
            <a href="/maint">
              <button className="btn firstbtn2 w-100 py-5">
                MAINTANANCE
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Hr