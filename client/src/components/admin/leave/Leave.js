import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Table } from "antd";
import "react-datepicker/dist/react-datepicker.css";
import './Leave.css'
import 'antd/dist/antd.css';
import { SERVER_URL_LEAVE } from "../../Globals";

function Leave() {

  const [dataSource, setDataSource] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const columns = [

    {
      title: 'EmployeeName',
      dataIndex: 'empName',
      key: '1',
    },
    {
      title: 'EmpID',
      dataIndex: 'empID',
      key: '2',
    },
    {
      title: 'EndDate',
      dataIndex: 'to',
      key: '3',
    },
    {
      title: 'Days',
      dataIndex: 'days',
      key: '4',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: '4',
    },


  ];

  const fetchRecords = (page) => {
    setLoading(true);
    let user_id = localStorage.getItem('user_id')
    console.log('user_id', user_id)
    axios
      .get(SERVER_URL_LEAVE + `today-leave`)
      .then((res) => {
        setDataSource(res.data.result);
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

export default Leave