   import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Table } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import './Leave.css'
import 'antd/dist/antd.css';
import {SERVER_URL_EMPLOYEE} from "../../Globals";

function Leave() {
  const [leave, setLeave] = useState({
    from: "",
    to: "",
    subject: "",

  })
  const [dataSource, setDataSource] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target
    setLeave({

      ...leave,
      [name]: value
    })
  }
  const postDatas = () => {
    const { form, to, subject } = leave
    console.log("form", form)
    console.log("to", to)
    console.log("subject", subject)
    let user_id = localStorage.getItem('user_id')
    console.log('user_id', user_id)
    axios.post(SERVER_URL_EMPLOYEE+`emp-leave?id=${user_id}`, leave, {
      headers: { "user_id": user_id }
    }).then((Response) => {
      console.log("leave",Response)
      fetchRecords()
    }).catch((error) => {
      console.log(error)
    })
  }

  const columns = [
    {
      title: "Reason",
      dataIndex: "subject",
    },
    {
      title: "StartDate",
      dataIndex: "from",
    },
    {
      title: "EndDate",
      dataIndex: "to",
    },
    {
      title: "Days",
      dataIndex: "days",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  useEffect(() => {
    fetchRecords(1);
  }, []);
  const fetchRecords = (page) => {
    setLoading(true);
    let user_id = localStorage.getItem('user_id')
    console.log('user_id', user_id)
    axios
      .get(SERVER_URL_EMPLOYEE+`myleavedetails?id=${user_id}`)
      .then((res) => {
        console.log('res', res)
        console.log('days', res.data.result)

        console.log('res.data.data', res.data.data)
        setDataSource(res.data.result);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      });
  };

  return (
    <div style={{padding:'20px'}}>
      <div className='leaveform'>
        <section className='get_in_touch'>
          <div className='container'>
            <div className='contact-form row'>
              <div className='form-field col-lg-6'>

                <input id='from' value={leave.from} className='input-text' type='Date' name='from' onChange={handleChange} />
                <label for='from' className='labels'>StartDate</label>
              </div>
              <div className='form-field col-lg-6'>

                <input id='to' className='input-text' type='Date' value={leave.to} onChange={handleChange} name='to' />
                <label for='to' className='labels'>EndDate</label>
              </div>
              <div className='form-field col-lg-6'>
                <input id='subject' value={leave.subject} className='input-text' type='text' name='subject' onChange={handleChange} />
                <label for='subject' className='label'>Reason</label>
              </div>
              <div className='form-field col-lg-12'>
                <input onClick={postDatas} className='submit-btn' type='submit' value='APPLY LEAVE' />

              </div>

            </div>
          </div>
        </section>
      </div>
      <div>
      <Table style={{marginTop:'20px'}}
                  loading={loading}
                  columns={columns}
                  dataSource={dataSource}
                  pagination={{
                    pageSize: 10,
                    total: totalPages,
                    onChange: (page) => {
                      fetchRecords(page);
                    },
                  }}
                  
                ></Table>
      </div>
    </div>
  )
}

export default Leave