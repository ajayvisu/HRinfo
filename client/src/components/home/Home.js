import React, { useState } from "react";
import "./Home.css";
import Carousel from "react-bootstrap/Carousel";
import Login from "../login/Login";
import { Image } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [empID, setempId] = useState("");
    const [password, setpassword] = useState("");

    const login = () => {
        let data = {
            email: empID,
            password: password,
        };
        // console.log('data',data);
        axios
            .post("http://localhost:4000/api/emp/login", data)
            .then((result) => {
                console.log("data", result.data.data.email);
                if (result.data.data.role == "developer") {
                    navigate("/dashbord");
                    localStorage.setItem('name', result.data.data.empName);
                    localStorage.setItem('user_id', result.data.data._id);
                    localStorage.setItem('email',  result.data.data.email);
                    localStorage.setItem('id', result.data.data.empID);
                    localStorage.setItem('entryTime', result.data.data.entryTime);
                    localStorage.setItem('token', result.data.token);
                    localStorage.setItem('mobile', result.data.data.mobile);
                    localStorage.setItem('role', result.data.data.role);
                    localStorage.setItem('img2', result.data.data.image);

                }else{
                    navigate("/profile");
                    localStorage.setItem('name', result.data.data.empName);
                    localStorage.setItem('user_id', result.data.data._id);
                    localStorage.setItem('email',  result.data.data.email);
                    localStorage.setItem('id', result.data.data.empID);
                    localStorage.setItem('entryTime', result.data.data.entryTime);
                    localStorage.setItem('token', result.data.token);
                    localStorage.setItem('mobile', result.data.data.mobile);
                    localStorage.setItem('role', result.data.data.role);
                    localStorage.setItem('img', result.data.data.image);
                }
            })
            .catch((err) => {
                console.log("err", err);
            });
    };

    return (
        <>
            <section class="body">
                <div class="container">
                    <div class="login-box">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="logo">
                                    <span class="logo-font">Hr</span>Info
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <br />
                                <h3 class="header-title">LOGIN</h3>
                                <form class="login-form">
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Email or UserName" onChange={(e) => setempId(e.target.value)} />
                                    </div>
                                    <div class="form-group">
                                        <input type="Password" class="form-control" placeholder="Password" onChange={(e) => setpassword(e.target.value)} />
                                        <a href="#!" class="forgot-password">Forgot Password?</a>
                                    </div>
                                    <div class="form-group">
                                        <button type="button" class="btn btn-primary btn-block" onClick={login}>LOGIN</button>
                                    </div>
                                    <div class="form-group">
                                        <div class="text-center">New Member? <a href="#!">Sign up Now</a></div>
                                    </div>
                                </form>
                            </div>
                            <div class="col-sm-6 hide-on-mobile">
                                <div id="demo" class="carousel slide" data-ride="carousel">
                                    <ul class="carousel-indicators">
                                        <li data-target="#demo" data-slide-to="0" class="active"></li>
                                        <li data-target="#demo" data-slide-to="1"></li>
                                    </ul>
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <div class="slider-feature-card">
                                                <img src="https://i.imgur.com/YMn8Xo1.png" alt="" />
                                                <h3 class="slider-title">Title Here</h3>
                                                <p class="slider-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure, odio!</p>
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <div class="slider-feature-card">
                                                <img src="https://i.imgur.com/Yi5KXKM.png" alt="" />
                                                <h3 class="slider-title">Title Here</h3>
                                                <p class="slider-description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione, debitis?</p>
                                            </div>
                                        </div>
                                    </div>
                                    <a class="carousel-control-prev" href="#demo" data-slide="prev">
                                        <span class="carousel-control-prev-icon"></span>
                                    </a>
                                    <a class="carousel-control-next" href="#demo" data-slide="next">
                                        <span class="carousel-control-next-icon"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;