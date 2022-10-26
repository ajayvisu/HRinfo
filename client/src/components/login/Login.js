import React, { useState } from "react";
import "./login.css";
import axios from "axios";

const Login = () => {
  const [empID, setempId] = useState("");
  const [password, setpassword] = useState("");

  const login = () => {
    let data = {
      empid: empID,
      password: password,
    };
    axios
      .post("http://192.168.1.5:4000/api/emp/login", data)
      .then((result) => {
        console.log("data", result.data);
        localStorage.setItem('user_id',result.data.data._id)
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <div className="container col-md-3 mt-5">
        <div className="">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">
                How about a personalised demo?
              </h5>
              <div className="d-grid gap-2 d-md-block">
                <form>
                  <div className="mb-2">
                    <label className="form-label">EMPLOYEE ID</label>
                    <input type="text" className="form-control" onChange={(e)=>setempId(e.target.value)} />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">PASSWORDD</label>
                    <input type="password" className="form-control" onChange={(e)=>setpassword(e.target.value)} />
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary form-control "
                    onClick={login}
                  >
                    BOOK NOW
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
