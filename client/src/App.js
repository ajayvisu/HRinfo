import React, { useEffect, useState } from 'react'
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router ,Routes, Route } from "react-router-dom";
import Emp_Dashboard from "./components/Emp_Dashboard/Emp_Dashboard";
import Home from './components/home/Home'
import Dashboard from "./components/Dashboard/Dashboard";
import jwt_decode from "jwt-decode";
function App() {
  const[status,setStatus] = useState({
    data:"data"
  })
useEffect(()=>{
let token =localStorage.getItem('token')
if(token){
  let decode =jwt_decode(token)
  let role=decode.role
setStatus({data:role})
}else{
  setStatus({data:'data'})
}
},[])
  return (
    
    <>
   {
    status.data === "data" ?(
      <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
      </Routes>
     </Router>
    ):null
   }
{
  status.data === "admin" ? (
    <Dashboard/>
  ):null
}
{
  status.data === "user" ? (
    <Emp_Dashboard/>
  ):null
}

  </>
        
  );
}

export default App;
