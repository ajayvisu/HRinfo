import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Table } from "antd";
import "react-datepicker/dist/react-datepicker.css";

import 'antd/dist/antd.css';
function AttendanceAdmin() {

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
      title: 'EntryTime',
      dataIndex: 'entryTime',
      key: '2',
    },
    {
      title: 'DurationHours',
      dataIndex: 'durationHours',
      key: '3',
    },
    {
        title: 'DurationMinutes',
        dataIndex: 'durationMinutes',
        key: '3',
      },
  ];

  const fetchRecords = (page) => {
    setLoading(true);
    let user_id = localStorage.getItem('user_id')
    console.log('user_id', user_id)
    axios
      .get(`http://localhost:4000/api/attendance/today-attendance-list`)
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

export default AttendanceAdmin