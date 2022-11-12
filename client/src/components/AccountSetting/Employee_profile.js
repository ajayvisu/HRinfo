import React, { useState } from "react";
import "./Employee_profile.css";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Modal, Upload, Image, Avatar } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";

const Employee_profile = () => {
  const [number, setMobile] = useState(localStorage.getItem("mobile"));
  const [id, setId] = useState(localStorage.getItem("id"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [change, setChange] = useState(true);
console.log('email',email)
  const [img, setImg] = useState(localStorage.getItem("img2"));

  const Edit = () => {
    setChange(false);
  };

  // const emp = () =>{
  //    let id = localStorage.getItem('id')
  //    axios.get(`http://localhost:4000/api/emp/findone?empId=${id}`).then(data=>{
  //       console.log("res_emp",data.data.result.image);
  //       setImg(data.data.result.image)
  //    })
  // }

  if (img) {
    localStorage.setItem("img2", img);
  }

  console.log("img1");

  const image_upload = () => {
    // const formdata = new FormData();
    // formdata.append('file',img);
    // console.log('formdata',formdata);
    // const email = localStorage.getItem('email')
    // axios.post(`http://localhost:4000/img/img?email=${email}`,formdata,{headers:{'Content-Type':"multipart/form-data"}}).then(data=>{
    //    console.log("res",data);

    // }).catch(err=>{
    //    console.log("err",err.message)
    // })
    let image = {
      image: img,
    };
    axios
      .put(`http://localhost:4000/api/emp/imag_update?email=${email}`, image)
      .then((result) => {
        console.log("res", result.data);
      })
      .catch((err) => {
        console.log("err", err.message);
      });
  };

  return (
    <>
      <div class="content-full-width">
        <div class="profile">
          <div class="profile-header">
            <div class="profile-header-cover"></div>
            <div class="profile-header-content">
              <div class="profile-header-img">
                {img ? (
                  <Image width={113} src={img} />
                ) : (
                  <Avatar shape="square" size={113} icon={<UserOutlined />} />
                )}
              </div>
              <div class="profile-header-info">
                <h4 class="m-t-10 m-b-5">{localStorage.getItem("name")}</h4>
                <p class="m-b-10">Web And Frontend Developer</p>
                {/* <button type="button"  class="btn btn-xs btn-success">Edit Profile</button> */}
                <input
                  type="file"
                  id="myfile"
                  name="myfile"
                  onChange={(e) =>
                    setImg(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div class="profile-content">
          <div class="tab-content p-0">
            <div class="tab-pane fade in active show">
              <div class="table-responsive">
                <table class="table table-profile">
                  {/* <thead>
         `                     <tr>
                                 <th></th>
                                 <th>
                                    <h2>{localStorage.getItem('name')}<small>Lorraine Stokes</small></h2>
                                 </th>
                              </tr>`
                           </thead> */}
                  <tbody>
                    <tr class="highlight">
                      <td class="field">Contact</td>
                      <td className="contact">
                        <button type="button" onClick={Edit}>
                          Add Your Cantact
                        </button>
                      </td>
                    </tr>
                    <tr class="divider">
                      <td colspan="2"></td>
                    </tr>
                    <tr>
                      <td class="field">Mobile </td>
                      <td>
                        <input
                          type="text"
                          value={number}
                          placeholder="Number"
                          disabled={change}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="field">Email </td>
                      <td>
                        <span>{email}</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="field">ID</td>
                      <td>{id}</td>
                    </tr>
                    <tr class="divider">
                      <td colspan="2"></td>
                    </tr>
                    <tr class="highlight">
                      <td class="field">About Me</td>
                      <td>
                        <button
                          className="contact"
                          type="button"
                          onClick={Edit}
                        >
                          Add Description
                        </button>
                      </td>
                    </tr>
                    <tr class="divider">
                      <td colspan="2"></td>
                    </tr>
                    <tr>
                      <td class="field">Country/Region</td>
                      <td>
                        <select
                          class="form-control input-inline input-xs"
                          name="region"
                        >
                          <option value="US" selected="">
                            United State
                          </option>
                          <option value="AF">Afghanistan</option>
                          <option value="AL">Albania</option>
                          <option value="DZ">Algeria</option>
                          <option value="AS">American Samoa</option>
                          <option value="AD">Andorra</option>
                          <option value="AO">Angola</option>
                          <option value="AI">Anguilla</option>
                          <option value="AQ">Antarctica</option>
                          <option value="AG">Antigua and Barbuda</option>
                          <option value="IN">India</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td class="field">City</td>
                      <td>
                        <input
                          type="text"
                          value="Los Angeles"
                          placeholder="Number"
                          disabled={false}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="field">State</td>
                      <td>
                        <input
                          type="text"
                          value="Tamil Nadu"
                          placeholder="Number"
                          disabled={false}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="field">Gitup-Link</td>
                      <td>
                        <a href="javascript:;">Add Webpage</a>
                      </td>
                    </tr>
                    <tr>
                      <td class="field">Gender</td>
                      <td>
                        <select
                          class="form-control input-inline input-xs"
                          name="gender"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td class="field">Birthdate</td>
                      <td>
                        <input type="text" placeholder="DOB" disabled={false} />
                      </td>
                    </tr>
                    <tr>
                      <td class="field">Language</td>
                      <td>
                        <select
                          class="form-control input-inline input-xs"
                          name="language"
                        >
                          <option value="TA" selected="">
                            Tamil
                          </option>
                          <option value="EN">English</option>
                        </select>
                      </td>
                    </tr>
                    <tr class="highlight">
                      <td class="field">Education</td>
                      <td>
                        <button
                          className="contact"
                          type="button"
                          onClick={Edit}
                        >
                          Add Your Education
                        </button>
                      </td>
                    </tr>
                    <tr class="divider">
                      <td colspan="2"></td>
                    </tr>
                    <tr>
                      <td class="field">Degree </td>
                      <td>
                        <input
                          type="text"
                          value={""}
                          placeholder="Number"
                          disabled={change}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="field">Specialization </td>
                      <td>
                        <span>{""}</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="field">institue</td>
                      <td>{""}</td>
                    </tr>
                    <tr>
                      <td class="field">passingYear</td>
                      <td>{""}</td>
                    </tr>
                    <tr>
                      <td class="field">startDate</td>
                      <td>{""}</td>
                    </tr>
                    <tr>
                      <td class="field">endDate</td>
                      <td>{""}</td>
                    </tr>
                    <tr class="highlight">
                      <td class="field">Experience</td>
                      <td>
                        <button type="button" onClick={Edit}>
                          Add Your Experience
                        </button>
                      </td>
                    </tr>
                    <tr class="divider">
                      <td colspan="2"></td>
                    </tr>
                    <tr>
                      <td class="field">organization </td>
                      <td>
                        <input
                          type="text"
                          value={""}
                          placeholder="Number"
                          disabled={change}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="field">designation </td>
                      <td>
                        <span>{""}</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="field">startDate</td>
                      <td>{""}</td>
                    </tr>
                    <tr>
                      <td class="field">endDate</td>
                      <td>{""}</td>
                    </tr>
                    
                    <tr class="highlight">
                      <td class="field">Bank Details</td>
                      <td>
                        <button type="button" onClick={Edit}>
                          Add Your Bank Details
                        </button>
                      </td>
                    </tr>
                    <tr class="divider">
                      <td colspan="2"></td>
                    </tr>
                    <tr>
                      <td class="field">Bank Name </td>
                      <td>
                        <input
                          type="text"
                          value={""}
                          placeholder="Number"
                          disabled={change}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="field">Recipient Name </td>
                      <td>
                        <span>{""}</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="field">Account Number</td>
                      <td>{""}</td>
                    </tr>
                    <tr>
                      <td class="field">IFSC Code</td>
                      <td>{""}</td>
                    </tr>

                    <tr class="divider">
                      <td colspan="2"></td>
                    </tr>
                    <tr class="highlight">
                      <td class="field">&nbsp;</td>
                      <td class="p-t-10 p-b-10">
                        <button
                          type="submit"
                          class="btn btn-primary width-150"
                          onClick={image_upload}
                        >
                          Update
                        </button>
                        <button
                          type="submit"
                          class="btn btn-white btn-white-without-border width-150 m-l-5"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employee_profile;