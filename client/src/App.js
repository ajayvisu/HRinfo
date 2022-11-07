import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Emp_Dashboard from "./components/Emp_Dashboard/Emp_Dashboard";
import Home from './components/home/Home'

function App() {
  return (
     <Dashboard/>
    //  <Emp_Dashboard/>
    // <Home/>
  );
}

export default App;
