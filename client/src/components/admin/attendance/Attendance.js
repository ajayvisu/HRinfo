import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Table,Button, Input, Space, Typography  } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import { SERVER_URL_ATTENDANCE } from "../../Globals";
import { useNavigate } from "react-router-dom";
import 'antd/dist/antd.css';
function AttendanceAdmin() {
let navigate=useNavigate()
  const [dataSource, setDataSource] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'EmployeeName',
      dataIndex: 'employee',
      // render: (employee) => employee.map(employees => employees.empName).join(),
      // render: item => Object.values(item)[0],
      render: (employee) => employee.empName,
      key: '1',
    },
    {
      title: 'Date',
      dataIndex: "date",
      key: '2',
    },
    {
      title: 'TotalWorkingHours',
      dataIndex: 'totalWorkingHours',
      key: '3',
    }
  ,
  {
    title: "Performance",
    dataIndex: "",
    width: "15%",
    fixed: "right",
    key: "x",
    render: (data) => (
   
      <>
        <Button
          onClick={() => {
            navigate("/empperformance" , { state: data } );
          }}
        >
          performance
        </Button>
      </>
    ),
  },
];

  const fetchRecords = (page) => {
    setLoading(true);
    let user_id = localStorage.getItem('user_id')
    console.log('user_id', user_id)
    axios
      .get(SERVER_URL_ATTENDANCE + `today-attendance-list`)
      .then((res) => {
        console.log("attendance", res.data.data)
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
        style={{ marginTop: '20px' }}
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