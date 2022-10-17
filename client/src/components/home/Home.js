import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="container mt-3">
        <div className="row">
        <div className="col-lg-4 col-sm-6 col-6 offset-lg-4 offset-sm-3 offset-3 ">
            <div className="row gy-3">
              <div className="col-md-6 col-12">
                <button className="btn firstbtn1 w-100 py-5">HR</button>
              </div>
              <div className="col-md-6 col-12">
                <button className="btn firstbtn2 w-100 py-5">EMPLOYEE</button>
              </div>
              <div className="col-md-6 col-12">
                <button className="btn firstbtn1 w-100 py-5">MANAGEMENT</button>
              </div>
              <div className="col-md-6 col-12">
                <button className="btn firstbtn2 w-100 py-5">MAINTANANCE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
