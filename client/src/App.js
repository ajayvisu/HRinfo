import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";

import Emp from "./components/emp/Emp";
import Dashboard from "./components/Dashboard/Dashboard";
import Maint from "./components/maint/Maint";
import Login from "./components/login/Login";
import Hr from "./components/hr/Hr";
import Mgmt from "./components/mgmt/Mgmt";
import HomePage from './components/homePage/HomePage';

import AddEmp from "./components/AddEmployee/AddEmp";


function App() {
  return (
     <Dashboard/>
    
    // <App_image/>
    // <HomePage />
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Home />}></Route>
    //     <Route path="/hr" element={<Hr />}></Route>
    //     <Route path="/emp" element={<Emp />}></Route>
    //     <Route path="/mgmt" element={<Mgmt />}></Route>
    //     <Route path="/maint" element={<Maint />}></Route>
    //     <Route path="/login" element={<Login />}></Route>
    //   </Routes>
    // </Router>
  );
}

export default App;
