import { useRef, useState, useEffect } from "react";
import './EmployeeDetails.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Modal, Upload, Image, Avatar } from "antd";
const EmployeeDetails = () => {
    const navigate = useNavigate();
    const [employeeDetails, setEmployeeDetails] = useState([]);
    const getEmployeeDetails = async (data) => {
        await axios.get(`http://192.168.1.5:4000/api/emp/getEmployee`)
            .then((res) => {
                console.log("deatilss", res.data.result)
                setEmployeeDetails(res.data.result)

            }).catch((error) => {
                console.log(error)
            })
    }
    const IndivEmployeeData = async (data) => {

        console.log(data)

        await axios.get(`http://192.168.1.5:4000/api/emp/get-single-emp-details?_id=${data}`)
            .then((res) => {
                if (res.data.result) {
                    console.log("deatilss", res.data.result)
              
                    navigate('/viewdetails', { state: res.data.result})
                }

            }).catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        getEmployeeDetails();
    }, []);
    return (
        <>
            <div className="main">
                {
                    employeeDetails.map((curElem, index) => {
                        return (
                            <div className="card" style={{width:"20%"}} key={index}>
                                <div className="image">
                                    {/* <img src={"http://localhost:4000/" +curElem.image} /> */}
                                    {curElem.image ? (
                //   <Image  width={213} src={"http://localhost:4000/" + curElem.image  } />
                  <Avatar style={{marginTop:"20px"}} shape="square" size={64} src={"http://localhost:4000/" + curElem.image  } />
                  ) : (
                    <Avatar style={{marginTop:"20px"}} shape="square" size={64} icon={<UserOutlined />} /> )}
                                </div>
                                <div className="title">
                                    <h1>
                                        {curElem.empName}</h1>
                                </div>
                                <div className="des">
                                    <p>EMPID : {curElem.empID}</p>
                                    <button onClick={() => IndivEmployeeData(curElem._id)}>Read More...</button>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </>
    );
}
export default EmployeeDetails;