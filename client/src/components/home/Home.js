import React, { useEffect, useState } from 'react'
import "./Home.css";
import axios from "axios";
import Dashboard from "../Dashboard/Dashboard"
import Emp_Dashboard from "../Emp_Dashboard/Emp_Dashboard";

const Home = () => {

  const [empID, setempId] = useState("");
  const [password, setpassword] = useState("");
const [getUser,setUser]=useState("")
  const login = () => {
    let data = {
      email: empID,
      password: password,
    };
    // console.log('data',data);
    axios
      .post("http://localhost:4000/api/emp/login", data)
      .then((result) => {
        console.log("datas", result.data);
        let role = localStorage.getItem('role')
        setUser(role)
        console.log(getUser)
        console.log('attendance',result.data.attendancedata._id)
        if (result.data.status === "success") {
          localStorage.setItem('attendanceId',result.data.attendancedata._id)
          localStorage.setItem('status',result.data.status);
           localStorage.setItem('name',result.data.data.empName);
           localStorage.setItem('user_id',result.data.data._id);
           localStorage.setItem('email',result.data.data.email);
           localStorage.setItem('id',result.data.data.empID);
           localStorage.setItem('entryTime',result.data.data.entryTime);
           localStorage.setItem('token',result.data.token);
           localStorage.setItem('mobile',result.data.data.mobile);
           localStorage.setItem('role',result.data.data.role);
           
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
    let role = localStorage.getItem('role')
  useEffect(() => {
    login()
  }, [getUser])
  if(getUser === 'admin'){
    return(
        <div>
        
<Dashboard/>
        </div>
    )

  }else if(getUser === 'user'){
    return(
        <div>
   <Emp_Dashboard/>
        </div>
    )
 
  }else{
    return (
        <div>
           
         <header className='head'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsHzyMlSh8Bo_RDS5UYpw-YreCFb0ajENS2w&usqp=CAU" class="profile-img"/>
                <nav>
                    <ul>
                        <li><a href="#hero">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#contact">Contact</a></li>
                        <li ><a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" href="">Login</a></li>
                    </ul>
                </nav>
                
            </header>
            {/* <!-- Modal --> */}
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Login</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <div class="input-group">
                                 <input class="form-control"
                                  onChange={(e) => setempId(e.target.value)}
                                  type="text" placeholder="Email ID"/> 
                                 </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <div class="input-group">
                                 <input class="form-control" 
                                   onChange={(e) => setpassword(e.target.value)}
                                 type="password" placeholder="Password"/> 
                                 </div>
                        </div>
                    </div>
                </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
            <button type="button" 
             onClick={login}
            class="btn btn-primary btn-block confirm-button" style={{height:'40px'}}>sign-in</button>
          </div>
        </div>
      </div>
    </div>
            <main>
                <div>
                <section className='option' id="hero">
                    <div class="section-inner">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsHzyMlSh8Bo_RDS5UYpw-YreCFb0ajENS2w&usqp=CAU" class="profile-img"/>
                        <h1>Hi, I'm Boberick the llama.</h1>
                    </div>
                </section>
                </div>
                <div>
                <section className='option' id="about">
                    <div class="section-inner">
                        <h2>About me</h2>
                        <p>I'm a really awesome llama. Every day I wake up, munch on some grass, do some coding and then go back to sleep.</p>
                        <h3>Achievements</h3>
                        <ul>
                            <li>Bachelor of photogenic posing, 2010</li>
                            <li>Llamaness certification from the Llama Institute, 2014</li>
                            <li>I coded a website, 2017</li>
                        </ul>
                    </div>
                </section>
                </div>
                <div>
                <section className='option' id="contact">
                    <div class="section-inner">
                        <h2>Contact me</h2>
                        <p>You can find me on:</p>
                        <ul>
                            <li><a href="https://twitter.com/llama">Twitter</a></li>
                            <li><a href="https://www.reddit.com/user/llama">Reddit</a></li>
                            <li><a href="https://www.instagram.com/llamasporfavor/">Instagram</a></li>
                        </ul>
                        <p>Or, you can <a href="mailto:llama@codetheweb.blog">send me an email</a>.</p>
                    </div>
                </section>
                </div>
            </main>
            <footer>
                © Copyright Boberick The Llama, 2017
            </footer>
        </div>
    )    
  }
  
  

};

export default Home;