import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate} from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [empID, setempId] = useState("");
  const [password, setpassword] = useState("");

  const login = () => {
    let data = {
      email: empID,
      password: password,
    };
    axios
      .post("http://localhost:4000/api/emp/login", data)
      .then((result) => {
        console.log("data", result.data);
        if(result.data.status === "success"){
         navigate("/hr")
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <>
      <div className="container mt-5">
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
