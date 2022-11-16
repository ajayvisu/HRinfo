import React, { useEffect, useState } from 'react'
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.min.css';
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import Emp_Dashboard from "./components/Emp_Dashboard/Emp_Dashboard";
import Home from './components/home/Home'
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
//  const [loginStatus,setLoginStatus]=useState(0)
 
// const login =()=>{
//   role =localStorage.getItem('role')
//   console.log(role)
// }

// useEffect(() => {
//   login()

// }, [])
  return (
    
     <div>
       <Home/>    
     </div>
        
  );
}

export default App;
