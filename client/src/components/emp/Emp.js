import { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";

function Emp() {
  const [dataSource, setDataSource] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRecords(1);
  }, []);
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

  const fetchRecords = (page) => {
    setLoading(true);
    let user_id=localStorage.getItem('user_id')
    console.log('user_id',user_id)
    axios
      .get(`http://localhost:4000/api/emp/myleavedetails?id=${user_id}`)
      .then((res) => {
        console.log('res',res)
        console.log('days',res.data.result)
        
        console.log('res.data.data',res.data.data)
        setDataSource(res.data.result);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Table
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
  );
}
export default Emp;