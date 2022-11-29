import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Table } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import { SERVER_URL_ATTENDANCE } from '../../Globals';
import 'antd/dist/antd.css';
function Attendance() {

  const [dataSource, setDataSource] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
let count=0
  const columns = [
    
    {
      title: 'Date',
      dataIndex:"date" ,
      key: '1',
    },
    {
      title: 'TotalWorkingHours',
      dataIndex: 'totalWorkingHours',
      key: '2',
    },
  
  ];

  const fetchRecords = (page) => {
    setLoading(true);
    let user_id = localStorage.getItem('user_id')
    console.log('user_id', user_id)
    axios
      .get(SERVER_URL_ATTENDANCE+`my-attendance-list?id=${user_id}`)
      .then((res) => {
        console.log(res.data.data)
        setDataSource(res.data.data);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchRecords(1);
  }, []);
  return (
    <div>
     
     <Table
     style={{ marginTop:'20px'}}
     loading={loading}
    columns={columns}
    dataSource={dataSource}
    pagination={{
      total: totalPages,
      pageSize: 10,
        onChange: (page) => {
          fetchRecords(page);
          },
      }}
    scroll={{
      x: 1300,
     
    }}
    
  />
    </div>
  )
}

export default Attendance