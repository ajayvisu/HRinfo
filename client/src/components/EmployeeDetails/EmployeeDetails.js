import { useRef, useState, useEffect } from "react";
import './EmployeeDetails.css'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const EmployeeDetails = () => {
    const navigate = useNavigate();
    const [employeeDetails, setEmployeeDetails] = useState([]);
    const getEmployeeDetails = async (data) => {
        await axios.get(`http://192.168.1.5:4000/api/emp/get-all-employee-details`)
            .then((res) => {
                console.log("deatilss", res.data.result)
                setEmployeeDetails(res.data.result)

            }).catch((error) => {
                console.log(error)
            })
    }
    const IndivEmployeeData = async (data) => {

        console.log(data)

        await axios.get(`http://192.168.1.5:4000/api/emp/get-single-emp-details?id=${data}`)
            .then((res) => {
                if (res.data.result) {

                    console.log("deatilss", res.data.result)
                    navigate('/viewdetails', { state: res.data.result })
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
            <div class="main">
                {
                    employeeDetails.map((curElem, index) => {
                        return (
                            <div class="card" key={index}>
                                <div class="image">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1fYaY9LEjaK0yhT3WsncM36y6MD9sLCHU4A&usqp=CAU" />
                                </div>
                                <div class="title">
                                    <h1>
                                        {curElem.empName}</h1>
                                </div>
                                <div class="des">
                                    <p>You can Add Desccription Here...</p>
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