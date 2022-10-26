import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";

import Emp from "./components/emp/Emp";
import Dashboard from "./components/Dashboard/Dashboard";
import Maint from "./components/maint/Maint";
import Login from "./components/login/Login";
import Leave from "./components/leave/Leave";
function App() {
  return (
    <>
    <Dashboard/>
    </>
    // <Router>
      
    //   <Routes>
    //     <Route path="/" element={<Home />}></Route>
    //     <Route path="/hr" element={<Hr />}></Route>
    //     <Route path="/emp" element={<Emp />}></Route>
      
    //     <Route path="/maint" element={<Maint />}></Route>
    //     <Route path="/login" element={<Login />}></Route>
    //     <Route path="/leave" element={<Leave />}></Route>
    //     <Route path="/dashboard" element={<Dashboard/>}></Route>
    //   </Routes>
    // </Router>
  );
}

export default App;
