import React, { useState, useEffect } from "react";
import "./Employee_profile.css";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Modal, Upload, Image, Avatar } from "antd";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import {SERVER_URL_EMPLOYEE,SERVER_URL} from "../../Globals";
const Employee_profile = () => {
  const [image, setImg] = useState();
  const [images, setImgs] = useState();

  // const [number, setMobile] = useState(localStorage.getItem("mobile"));
  const [id, setId] = useState(localStorage.getItem("id"));
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [change, setChange] = useState(true);
 
  const [ updateDatas, setUpdateData] = useState({
    Degree: "",
    Specialization:"",
    institue: "",
    passingYear:"",
    startDate:"",
    endDate:"",
    organization:"",
    designation:""
})
const[Degree,setDegree] = useState()
const[Specialization,setSpecialization] = useState()
const[institue,setinstitue] = useState()
const[passingYear,setpassingYear] = useState()
const[startDate,setstartDate] = useState()
const[endDate,setendDate] = useState()
const[organization,setorganization] = useState()
const[designation,setdesignation] = useState()
const[mobile,setMobile] = useState()
const[TotelExperience,setTotelExperience] = useState()

  const formDataFun = (file, body = {}) => {
    console.log("file", file)
    console.log("body", body)
    const formdata = new FormData

    formdata.append('file', file[0]);
    for (const key in body) {
      formdata.append(key, body[key]);
    }
    return formdata
  }

  const image_upload = () => {
    let id = localStorage.getItem("user_id")
 
    const retData = formDataFun(image)
    axios
      .put(SERVER_URL_EMPLOYEE+`updateimage?id=${id}`, retData)
      .then((result) => {
        console.log("res", result.data);
        data()
      })
      .catch((err) => {
        console.log("err", err.message);
      });
  };
  const data = () => {
    let id = localStorage.getItem('user_id')
    axios.get(SERVER_URL_EMPLOYEE+`getIndivData?id=${id}`).then(result => {
      console.log("getIndivData", result.data.result.education)
      result.data.result.education.map(item => {
        console.log('item', item.Degree)
        setDegree( item.Degree)
        setstartDate( item.startDate)
        setendDate(item.endDate)
        setSpecialization(item.Specialization)
        setinstitue(item.institue)
        setpassingYear(item.passingYear)
      })
      setImgs(result.data.result.image)
setMobile(result.data.result.mobile )
result.data.result.experience.map(item=>{
  setorganization(item.organization)
  setdesignation(item.designation)
  setTotelExperience(item.TotelExperience)
})


    })
  }
  const updateData =()=>{
    let id = localStorage.getItem('user_id')
   let data={
    education: [{
      Degree: Degree,
      Specialization:Specialization,
      institue: institue,
      passingYear:passingYear,
      startDate:startDate,
      endDate:endDate,
    }],

    experience: [{
      organization:organization,
      designation:designation,
      TotelExperience:TotelExperience
    }],

      mobile:mobile
    }
    axios.put(SERVER_URL_EMPLOYEE+`update?id=${id}`,data).then(result => {
      console.log("getIndivData", result.data.result)
     
    }).catch(err=>{
      console.log('err',err)
    })
  }
  useEffect(() => {
    data()

  }, [])
  return (
    <>
      <div class="content-full-width">
        <div class="profile">
          <div class="profile-header">
            <div class="profile-header-cover"></div>
            <div class="profile-header-content">
              <div class="profile-header-img">

                {images ? (
                  <Image width={113} src={SERVER_URL + images} />
                ) : (
                  <Avatar shape="square" size={113} icon={<UserOutlined />} />
                )}
              </div>
              <div class="profile-header-info">
                <h4 class="m-t-20 m-b-5">{localStorage.getItem("name")}</h4>
                <p class="m-b-10">{id}</p>
                {/* <button type="button"  class="btn btn-xs btn-success">Edit Profile</button> */}
                <input
                  type="file"
                  id="myfile"
                  name="myfile"
                  // value={image}
                  onChange={(event) => setImg(event.target.files)}
                />
                   <button
                          type="submit"
                          class="upload"
                          onClick={image_upload}
                        >
                          Upload Image
                        </button>
              </div>
            </div>
          </div>
        </div>
        <div class="profile-content">
          <div class="tab-content p-0">
            <div class="tab-pane fade in active show">
              <div class="table-responsive">
                <table class="table table-profile">

                  <tbody>

                    <tr class="divider">
                      <td colspan="2"></td>
                    </tr>
                    <tr>
                      <td class="field">Mobile </td>
                      <td>
                        <input
                          type="text"
                          value={mobile}
                          onChange={(e)=>setMobile(e.target.value)} 
                          
                          placeholder="Number"
                          // disabled={change}
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
                      <td class="field"></td>
                      <td>
                        <td
                          className="education"
                        >
                          Education
                        </td>
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
                          value={ Degree}
                          onChange={(e)=>setDegree(e.target.value)} 
                          placeholder="degree"
                          
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="field">Specialization </td>
                      <td>
                      <input
                          type="text"
                          value={Specialization}
                          onChange={(e)=>setSpecialization(e.target.value)} 
                          placeholder="Specialization"
                         
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="field">institue</td>
                      <td>
                      <input
                          type="text"
                          value={ institue}
                          onChange={(e)=>setinstitue(e.target.value)} 
                          placeholder="institue"
                         
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="field">passingYear</td>
                      <td>
                      <input
                          type="text"
                          value={ passingYear}
                          onChange={(e)=>setpassingYear(e.target.value)} 
                          placeholder="passingYear"
                         
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="field">startDate</td>
                      <td>
                      <input
                          type="text"
                          value={startDate}
                          onChange={(e)=>setstartDate(e.target.value)} 
                          placeholder="startDate"
                      
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="field">endDate</td>
                      <td>
                      <input
                          type="text"
                          value={endDate}
                          onChange={(e)=>setendDate(e.target.value)} 
                          placeholder="endDate"
                       
                        />
                      </td>
                    </tr>
                    <tr class="highlight">
                      <td class="field"></td>
                      <td>
                        <td className="education">
                          Experience
                        </td>
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
                          value={organization}
                          onChange={(e)=>setorganization(e.target.value)} 
                          placeholder="organization"
                       
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="field">designation </td>
                      <td>
                      <input
                          type="text"
                          placeholder="designation"
                          value={designation}
                          onChange={(e)=>setdesignation(e.target.value)} 
                        />
                      </td>
                    </tr>
                    <tr>
                      <td class="field">TotelExperience </td>
                      <td>
                      <input
                          type="text"
                          placeholder="TotelExperience"
                          value={TotelExperience}
                          onChange={(e)=>setTotelExperience(e.target.value)} 
                        />
                      </td>
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
                        onClick={updateData}
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