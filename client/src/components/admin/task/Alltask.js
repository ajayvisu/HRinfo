import React, { useState, useEffect } from 'react'
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import './Task.css'
import 'antd/dist/antd.css';
import { SERVER_URL_TASK } from "../../Globals";
import { useNavigate } from "react-router-dom";

function Alltask() {
  const navigate = useNavigate();

  const [dataSource, setDataSource] = useState([]);
  const [status, setStatus] = useState()

  const task = () => {
    let id = localStorage.getItem('id')
    axios
      .get(SERVER_URL_TASK + `get-all-task`)
      .then((res) => {
        // if(res.data.result === 0){
        //   alert('no pending leaves')
        //  }
        console.log('res', res.data.status)
        if (res.data.status) {
          setDataSource(res.data.data);
          res.data.data.map(data => {
            setStatus(data.status)
          })
        } else {
          Swal.fire('task not assigned')
        }
      });
  };
  const updateStatus = (id) => {
    console.log('id', id)
    let data = {
      status: status
    }
    console.log('status', status)
    axios
      .put(SERVER_URL_TASK + `emp-update?id=${id}`, data)
      .then((res) => {
        console.log('res', res)

      });
  };
  useEffect(() => {
    task();
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
                      <th scope="col">empName</th>
                      <th scope="col">empID</th>
                      <th scope="col">project</th>
                      <th scope="col">tasktitle</th>
                      <th scope="col">describe</th>
                      <th scope="col">status</th>
                      <th scope='col'>submit</th>

                    </tr>
                  </thead>
                  {
                    dataSource.map((data, index) => {
                      return (
                        <tbody>

                          <tr key={index}>
                            <td>{data.empName}</td>
                            <td>{data.empID}</td>
                            <td>{data.project}</td>
                            <td>{data.tasktitle}</td>
                            <td>{data.describe}</td>

                            <td>
                              {/* <input value={status}
                            onChange={(e)=>setStatus(e.target.value)} ></input> */}

                              <select class="form-select mt-4" name="status" onChange={(e) => setStatus(e.target.value)} >
                                <option selected disabled>{data.status}</option>
                                <option value="TASK_PROGRESS">TASK_PROGRESS</option>
                                <option value="TASK_DONE">TASK_DONE</option>
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

export default Alltask;