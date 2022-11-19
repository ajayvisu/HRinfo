import { useRef, useState, useEffect } from "react";
import './PayDetails.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'antd';
import { SERVER_URL_TRANSACTION, SERVER_URL_EMPLOYEE } from "../../Globals";

const PayDetails = () => {
  const navigate = useNavigate()
  //const [search,setSearch] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [getEmployeeList, setEmployeeList] = useState([])
  const [transaction, setTransaction] = useState({
    start: "",
    end: "",
    empID: "",
    id: ""
  })
  const fetchSalaryRecord = (page) => {
    axios
      .get(SERVER_URL_TRANSACTION + `get-payrecord`)
      .then((res) => {
        console.log('res', res)
        console.log('days', res.data.result)
        setDataSource(res.data.result);

      });
  };


  const addtransaction = () => {
    let token = localStorage.getItem('token')
    console.log(token)
    axios.post(SERVER_URL_TRANSACTION + `transaction`, transaction, {
      headers: { "token": token }
    })
      .then((res) => {
        console.log('transaction', res)
      }).catch(err => {
        console.log('err', err.message)
      })
  }
  const employeelist = () => {
    try {
      axios.get(SERVER_URL_EMPLOYEE + `getEmployee`).then(res => {
        console.log('employee', res.data.result)
        setEmployeeList(res.data.result)
      }).catch(err => {
        console.log('err', err.message)
      })
    } catch (err) {
      console.log("error", err.message)
    }
  }


  const handleChange = (e) => {
    const { name, value } = e.target
    console.log('value', value)
    setTransaction({
      ...transaction,
      [name]: value
    })

  }
  const columns = [

    {
      title: 'EMPLOYEE_ID',
      dataIndex: 'empId',
      key: '1',
    },
    {
      title: 'TRANSACTION_ID',
      dataIndex: 'transactionID',
      key: '2',
    },
    {
      title: 'MONTH',
      dataIndex: 'month',
      key: '3',
    },
    {
      title: 'AMOUNT',
      dataIndex: 'amount',
      key: '4',
    },


  ];
  const searchproduct = (key) => {
    console.log(key)
    if (key) {
      axios.get(SERVER_URL_TRANSACTION + `search-emp-id/+?key=${key}`)

        .then((res) => {

          setDataSource(res.data.result)

          console.log("search", res.data.result)
        }).catch((error) => {
          console.log(error)
        })
    }
  }

  useEffect(() => {
    fetchSalaryRecord()
    employeelist()
  }, []);
  return (
    <div>
      <head>
        {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link> */}

    </head>
    {/* <input type="text" placeholder="Search.." onChange={(key) => searchproduct(key.target.value)} style={{marginLeft:"70%", marginTop:'20px'}} name="search"/> */}
    <div class="form-outline">
  <input type="search" id="form1" class="form-control" placeholder="Search Transaction" aria-label="Search" onChange={(key) => searchproduct(key.target.value)} />
</div>
{/* <!-- Button trigger modal --> */}


      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" style={{ marginTop: "10%" }} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Transaction</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row mt-5" >
                <div className="col-md-6 m-auto ">
                  <div className=" ">

                    <form >

                      <div className="form-group">
                        {/* <div className="col-lg-7"> */}

                        {
                          <div className="cat-drop">
                            <label >Employee Name</label>
                            <select name="id" onChange={handleChange} className="form-control">
                              {getEmployeeList.map((data, index) => {
                                // console.log('data',data._id)
                                return (

                                  <option key={index} value={data._id}>{data.empName}</option>

                                )
                              })}

                            </select>
                          </div>
                        }
                        {/* </div> */}
                      </div>
                      <div className="form-group">
                        <label >Employee Id</label>
                        <input
                          type="text"

                          name="empID"
                          className="form-control"
                          onChange={handleChange}
                          placeholder="Enter Transaction Id"
                          value={transaction.empID}
                        />
                      </div>
                      <div className="form-group">
                        <label >Start Date</label>
                        <input
                          type="date"

                          name="start"
                          className="form-control"
                          onChange={handleChange}
                          placeholder="Enter Start Date"
                          value={transaction.start}
                        />
                      </div>

                      <div className="form-group">
                        <label >End Date</label>
                        <input
                          type="date"

                          name="end"
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Enter End Date"
                          value={transaction.end}
                          required
                        />
                      </div>


                      <button type="submit" style={{ marginTop: '20px', width: '100px' }}
                        onClick={addtransaction}
                        className="btn btn-primary btn-block">
                        Add
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              {/* <button type="button" className="btn btn-primary">Done</button> */}
            </div>
          </div>
        </div>
      </div>
      {/* <button type="button" className="btn btn-primary" data-toggle="modal" style={{marginLeft:"85%",marginTop:'-50px'}} data-target="#myModal">
    Add-Transaction
  </button> */}

      <Table
        style={{ marginTop: '20px' }}
        columns={columns}
        dataSource={dataSource}
        pagination={{

          onChange: (page) => {
            fetchSalaryRecord(page);
          },
      }}
    scroll={{
      x: 1300,
     
    }}
    
  />
  <button type="button" className="btn btn-primary" style={{marginRight:"85%"}} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Add Transaction
</button>
   
   
    </div>
  );
}
export default PayDetails;