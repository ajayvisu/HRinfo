import React, { useEffect, useState, useRef } from "react";
import './AdminHome.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Input, Space, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Chart from 'react-apexcharts'
import { SERVER_URL_EMPLOYEE,SERVER_URL_LEAVE } from "../../Globals";

import Highlighter from 'react-highlight-words';
import LeaveStatus from "../../leaveStatus/LeaveStatus";
const AdminHome = () => {
  const navigate = useNavigate();

  const [emp, setEmp] = useState('');
  const [pendingLeave, setPendingLeave] = useState();
  const [approvedLeave, setApprovedLeave] = useState();
  const [totalEmp, setTotalEmp] = useState();
  const [todayLeave, setTodayLeave] = useState();

  const [datas, setData] = useState({
    options: {
      labels: ['LoggedOut', 'LoggedIn']
    },
    series: [0, 0],
  });
  const loginUserStatus = () => {
    axios.get(SERVER_URL_EMPLOYEE + 'loginstatus').then(data => {
      let login = data.data.loginUsers / data.data.totalUsers * 100
      let notLoginUsers = data.data.totalUsers - data.data.loginUsers
      let notlogin = notLoginUsers / data.data.totalUsers * 100
      console.log('notlogin', notlogin)
      setData({ ...datas, series: [notlogin, login] })
      console.log('data', datas.series)
    }).catch(err => {
      console.log("err", err)
    })
  }
  const leaveStatus = () => {
    axios.get(SERVER_URL_LEAVE + 'leave-status').then(data => {
      // console.log('data',data.data.approvedLeave)
      // if(data.data.pendingLeave === 0){
      //  alert('no pending leaves')
      // }
      setPendingLeave(data.data.pendingLeave)
      setApprovedLeave(data.data.approvedLeave)
      setTotalEmp(data.data.totalEmp)

    }).catch(err => {
      console.log('err', err.message)
    })
  }
  const myEmployee = () => {
    axios.get(SERVER_URL_EMPLOYEE + 'getEmployee').then(result => {
      console.log('employee data ,', result.data.result)
      // for( let x of result.data.result) console.log("x",x.loginStatus)
      setEmp(result.data.result);
    }).catch(err => {
      console.log('err', err.message);
    })
  }
  const TodayLeave = () => {
    axios
      .get(SERVER_URL_LEAVE+`today-leave`)
      .then((res) => {
        console.log('TodayLeave',res.data.lengthOfLeave)
        setTodayLeave(res.data.lengthOfLeave)
      });
  };
  useEffect(() => {
    myEmployee()
    loginUserStatus()
    leaveStatus()
    TodayLeave()
  }, [])


  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      key: '1',
      title: "ID",
      dataIndex: 'empID',
      render: (text) => <a>{text}</a>,
      width: 200,
      ...getColumnSearchProps('empID'),
    },
    {
      key: '2',
      title: "NAME",
      dataIndex: 'empName',
      width: 200,
      ...getColumnSearchProps('empName'),
    },
    {
      key: '3',
      title: "DESIGNATION",
      dataIndex: 'role',
      width: 200,
      filters: [
        {
          text: 'user',
          value: 'user'
        },
        {
          text: 'developer',
          value: 'developer'
        }
      ],
      onFilter: (value, record) => record.role.indexOf(value) == 0,
    },
    {
      key: '4',
      title: "EMAIL",
      dataIndex: 'email'
    },
    {
      key: '5',
      title: "MOBILE",
      dataIndex: 'mobile',
      width: 150,
    },
    {
      key: '6',
      title: "STATUS",
      dataIndex: 'loginStatus',
      width: 100,
      render: (text) => <>{text == true ? <span className="badge bg-success rounded-pill">online</span> : <span className="badge bg-danger rounded-pill">Ofline</span>}</>,
      filters: [
        {
          text: 'Online',
          value: true
        },
        {
          text: 'Ofline',
          value: false
        }
      ],
      onFilter: (value, record) => record.loginStatus.indexOf(value) == 0,
    }
  ]
  return (
    <div>
      <div>
        <head>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css" />
          <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
          <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/bootstrap-extended.min.css" />
          <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/fonts/simple-line-icons/style.min.css" />
          <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/colors.min.css" />
          <link rel="stylesheet" type="text/css" href="https://pixinvent.com/stack-responsive-bootstrap-4-admin-template/app-assets/css/bootstrap.min.css" />
          <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet"></link>
          <title>Bootstap 5 Responsive Admin Dashboard</title>
        </head>

        <div className="grey-bg container-fluid" style={{ padding: "2px" }}>
          <section id="minimal-statistics" >
            <div className='row'>
              <div className="col-xl-3 col-sm-6 col-12">
                <div className="card" style={{ width: "90%", marginTop: '30px' }}>
                  <div className="card-content">
                    <div className="card-body">
                      <div className="media d-flex">
                        <div className="media-body text-left">
                          <h3 className="success">{totalEmp}</h3>
                          <span>Employees</span>
                        </div>
                        <div className="align-self-center">
                          <i className="icon-user success font-large-2 float-right"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-sm-6 col-12" onClick={() => navigate("/leaveresponse")}>
                <div className="card" style={{ width: "90%", marginTop: '30px' }}>
                  <div className="card-content">
                    <div className="card-body">
                      <div className="media d-flex">
                        <div className="align-self-center">
                          <i className="bi bi-hourglass-top red font-large-2 float-left"></i>
                        </div>
                        <div className="media-body text-right">
                          <h3>{pendingLeave}</h3>
                          <span >PENDING LEAVES</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-xl-3 col-sm-6 col-12" onClick={() => navigate("/leave")}>
                <div className="card" style={{ width: "90%", marginTop: '30px' }}>
                  <div className="card-content">
                    <div className="card-body">
                      <div className="media d-flex">
                        <div className="align-self-center">
                          <i className="bi bi-person-dash-fill primary font-large-2 float-left"></i>
                        </div>
                        <div className="media-body text-right">
                          <h3>{todayLeave}</h3>
                          <span>TODAY LEAVE</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "-28%", marginLeft: '10%' }}>
                <div className='pie' >
                  <Chart options={datas.options} series={datas.series} type="donut" width="380" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="App">
        <header className="App-header">
          <Table columns={columns} dataSource={emp} pagination={{ pageSize: 10 }} scroll={{ y: 270, }} ></Table>
        </header>
      </div>

    </div>
  );
};

export default AdminHome;