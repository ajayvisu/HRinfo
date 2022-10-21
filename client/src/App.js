import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Hr from "./components/hr/Hr";
import Emp from "./components/emp/Emp";
import Mgmt from "./components/mgmt/Mgmt";
import Maint from "./components/maint/Maint";
import Login from "./components/login/Login";

function App() {
  return (
    <Router>
      <h1>HRinfo</h1>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/hr" element={<Hr />}></Route>
        <Route path="/emp" element={<Emp />}></Route>
        <Route path="/mgmt" element={<Mgmt />}></Route>
        <Route path="/maint" element={<Maint />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
