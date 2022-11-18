import React, { useEffect, useState } from 'react'
import "./Home.css";
import axios from "axios";
import Dashboard from "../Dashboard/Dashboard"
import Emp_Dashboard from "../Emp_Dashboard/Emp_Dashboard";
import { SERVER_URL_EMPLOYEE, SERVER_URL_LEAVE } from "../Globals";
import { message } from 'antd';
import { Formik,useFormik, Form, Field, ErrorMessage } from 'formik';
import{ FacebookFilled , InstagramFilled, TwitterCircleFilled, MailFilled  } from  '@ant-design/icons';
const Home = () => {
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  const [getUser, setUser] = useState("")

  const validate = values => {
    const errors = {};
    if (!values.email) {
      errors.email = "*Required"
    } else if (!EMAIL_REGEX.test(values.email)) {
      errors.email = "*Invalid Email Address"
    }
    if (!values.password) {
      errors.password = "*Required"
    }
    return errors;
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validate,
    onSubmit: values => {
      console.log('value', values)
    }

  })
  const [refresh, setRefresh] = useState()
  const login = () => {
    let values = formik.values
    axios
      .post(SERVER_URL_EMPLOYEE + "login", values)
      .then((result) => {
        console.log("datas", result.data.message);

        let role = localStorage.getItem('role')
        setUser(role)

        console.log(getUser)
        console.log('attendance', result.data.attendancedata._id)
          
        if (result.data.status === "success") {
            
 
            
          window.location.href = '/';
 

          localStorage.setItem('attendanceId', result.data.attendancedata._id)
          localStorage.setItem('status', result.data.status);
          localStorage.setItem('user_id', result.data.data._id);
          localStorage.setItem('email', result.data.data.email);
          localStorage.setItem('id', result.data.data.empID);
          localStorage.setItem('entryTime', result.data.data.entryTime);
          localStorage.setItem('token', result.data.token);
          localStorage.setItem('role', result.data.data.role);

        } else {
          console.log("login")
          setTimeout(() => {
            message.warning(result.data.message);
          }, 1000);
          // window.location.href= '/';
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
  //   if(getUser === 'admin'){
  //     return(
  //         <div>

  // <Dashboard/>
  //         </div>
  //     )

  //   }else if(getUser === 'user'){
  //     return(
  //         <div>
  //    <Emp_Dashboard/>
  //         </div>
  //     )

  //   }else{
  return (
    <div>

      <header className='head'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsHzyMlSh8Bo_RDS5UYpw-YreCFb0ajENS2w&usqp=CAU" className="profile-img" />
        <nav>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li ><a className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" href="">Login</a></li>
          </ul>
        </nav>

      </header>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Login</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input className="form-control"
                        name='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        type="text" placeholder="Email ID" />
                    </div>
                  </div>
                </div>
              </div>
              {
                formik.touched.email && formik.errors.email ? <span className='span'>
                  {formik.errors.email}
                </span> : null
              }
              <div className="row">
                <div className="col-sm-12">
                  <div className="form-group">
                    <div className="input-group">
                      <input className="form-control"
                        name='password'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        type="password" placeholder="Password" />
                    </div>
                  </div>
                </div>
              </div>
              {
                formik.touched.password && formik.errors.password ? <span className='span'>
                  {formik.errors.password}
                </span> : null
              }

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">cancel</button>
              <button type="button"
                onClick={login}
                className="btn btn-primary btn-block confirm-button" style={{ height: '40px' }}>sign-in</button>

            </div>

          </div>
        </div>
      </div>

            <main>
                <div>
                <section className='option' id="hero">
                    <div className="section-inner">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsHzyMlSh8Bo_RDS5UYpw-YreCFb0ajENS2w&usqp=CAU" className="profile-img"/>
                        <h1>HRinfo Management System</h1>
                    </div>
                </section>
                </div>
                <div>
                <section className='option' id="about">
                    <div className="section-inner">
                        <h2>Ease Your HR, Payroll and Compliance Worries</h2>


                        <h5>Manage employee data, track leaves &
attendance and automate payroll with the
best HR & Payroll management software.
Ensure faster payroll processing with
complete employee life cycle management.</h5>
                       
                    </div>
                </section>
                </div>
                <div>
                <section className='option' id="contact">
                    <div className="section-inner">

                      

                    <a href="https://twitter.com/llama">
                            <TwitterCircleFilled style={{ fontSize: '500%', width: '2em'} } /></a>

                            <a href="https://www.instagram.com/llamasporfavor/">
                              <InstagramFilled  style={{ fontSize: '500%', width: '2em' }} /></a>   

                              <a href="https://twitter.com/llama">
                            < FacebookFilled style={{fontSize: '500%', width: '2em'}}/></a>    

                            <a href="mailto:safamsg@gmail.com">
                            <MailFilled style={{fontSize: '500%', width: '2em'}} />  </a>.


                        {/* <h2>Contact me</h2>
                        <p>You can find me on:</p>
                        <ul>
                            <li><a href="https://twitter.com/llama">
                            <TwitterCircleFilled /></a></li>
                            
                            <li><a href="https://www.instagram.com/llamasporfavor/">
                              <InstagramFilled /></a></li>

                              <li><a href="https://twitter.com/llama">
                            < FacebookFilled/></a></li>
                        </ul>
                        <p>Or, you can <a href="mailto:safamsg@gmail.com">send a email</a>.</p> */}
                    </div>
                </section>
                </div>
            </main>
            <footer>
                © HRInfo Management System, 2022
            </footer>
       
        <div>
          <section className='option' id="about">
            <div className="section-inner">
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
            <div className="section-inner">
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
     
      <footer>
        © Copyright Boberick The Llama, 2017
      </footer>
     </div>
  )
}



// };

export default Home;