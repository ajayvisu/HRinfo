import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        if (result.data.status === "success") {
          navigate("/hr");
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
              <h5 className="login_text card-title mb-4">LOGIN</h5>
              <div className="d-grid gap-2 d-md-block">
                <form>
                  <div className="mb-2">
                    <label className="form-label">Email Id</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) => setempId(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary form-control "
                    onClick={login}
                  >
                    Login Now
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
