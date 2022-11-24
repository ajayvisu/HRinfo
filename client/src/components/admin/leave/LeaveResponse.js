import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Table, Button, Input } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import './Leave.css'
import 'antd/dist/antd.css';
import { SERVER_URL_LEAVE } from "../../Globals";
import { ColumnProps } from "antd/lib/table";
import { useNavigate } from "react-router-dom";

function LeaveResponse() {
  const navigate = useNavigate();

  const [dataSource, setDataSource] = useState([]);
  const [status, setStatus] = useState()

  const pendingLeave = () => {
    axios
      .get(SERVER_URL_LEAVE + `pendingLeave`)
      .then((res) => {
        // if(res.data.result === 0){
        //   alert('no pending leaves')
        //  }
        console.log('res', res)
        setDataSource(res.data.result);
        res.data.result.map(data => {
          setStatus(data.status)
        })

      });
  };
  const updateStatus = (id) => {
    console.log('id', id)
    let data = {
      status: status
    }
    console.log('status', status)
    axios
      .put(SERVER_URL_LEAVE + `leave-permission-response?id=${id}`, data)
      .then((res) => {
        console.log('res', res)

      });
  };
  useEffect(() => {
    pendingLeave();
  }, []);
  return (
    <div>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
      </head>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-12">

            <div className="row">


              <div>
                <table className="mt-4 table table-bordered">
                  <thead className="bg-dark text-white">
                    <tr>
                      <th scope="col">EmployeeName</th>
                      <th scope="col">EMP_ID</th>
                      <th scope="col">StartDate</th>
                      <th scope="col">EndDate</th>
                      <th scope="col">Days</th>
                      <th scope="col">Status</th>
                      <th scope='col'>submit</th>
                    </tr>
                  </thead>
                  {
                    dataSource.map((data, index) => {
                      return (
                        <tbody>

                          <tr key={index}>

                            <td>{data.employee.empName}</td>
                            <td>{data.employee.empID}</td>
                            <td>{data.from}</td>
                            <td>{data.to}</td>
                            <td>{data.days}</td>
                            <td>
                              {/* <input value={status}
                            onChange={(e)=>setStatus(e.target.value)} ></input> */}

                              <select class="form-select " name="status" onChange={(e) => setStatus(e.target.value)} >
                                <option selected disabled>{data.status}</option>
                                <option value="approved">approved</option>
                                <option value="denied">denied</option>
                              </select>
                            </td>
                            <td className='button'>
                              <button onClick={() => updateStatus(data._id)} className="submit">Submit</button>

                            </td>
                          </tr>

                        </tbody>
                      )
                    })
                  }
                </table>
              </div>


            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default LeaveResponse;