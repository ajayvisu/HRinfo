import React, { useState ,useEffect} from "react";
import "./Employee_profile.css";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Modal, Upload, Image, Avatar } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";

const Employee_profile = () => {
  const [image, setImg] =useState();
  const [images, setImgs] =useState();

  const [number, setMobile] = useState(localStorage.getItem("mobile"));
  const [id, setId] = useState(localStorage.getItem("id"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [change, setChange] = useState(true);
console.log('email',email)
  const Edit = () => {
    setChange(false);
  };

  const formDataFun=(file,body={})=>{
    console.log("file",file)
    console.log("body",body)
    const formdata = new FormData

    formdata.append('file',file[0]);
    for (const key in body) {
        formdata.append(key,body[key]);
    }
    return formdata
}

  const image_upload = () => {
  let id=localStorage.getItem("user_id")
    const retData = formDataFun(image)
    axios
      .put(`http://localhost:4000/api/emp/updateimage?id=${id}`, retData)
      .then((result) => {
        console.log("res", result.data);
      data()
      })
      .catch((err) => {
        console.log("err", err.message);
      });
  };
const data = () =>{
  let id =localStorage.getItem('user_id')
  axios.get(`http://localhost:4000/api/emp/getIndivData?id=${id}`).then(result=>{
   console.log("getIndivData",result.data.result)
   setImgs(result.data.result.image)
  
  })
}
useEffect(()=>{
  data()
  
},[])
  return (
    <>
      <div class="content-full-width">
        <div class="profile">
          <div class="profile-header">
            <div class="profile-header-cover"></div>
            <div class="profile-header-content">
              <div class="profile-header-img">
                
                {images ? (
                  <Image width={113} src={"http://localhost:4000/"+images} />
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
                  // value={image}
                  onChange={ (event)=>setImg(event.target.files) }
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
                   
                    <tr class="divider">
                      <td colspan="2"></td>
                    </tr>
                  
                
                    <tr>
                      <td class="field">Birthdate</td>
                      <td>
                        <input type="text" placeholder="DOB" disabled={false} />
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