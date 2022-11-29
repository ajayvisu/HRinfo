import { Layout, Menu, Result } from 'antd';
import { Typography, Space, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import Dashboard_data from './Dashboard_data';
import { NavLink, withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PaySlip from '../admin/Payroll/PaySlip';
import 'antd/dist/antd.css';
import './Dashboard.css'
import Leave from '../admin/leave/Leave'
import AddEmployee from '../admin/AddEmployee/AddEmp';
import AdminHome from '../admin/adminHome/AdminHome';
import ViewDetails from '../admin/ViewDetails/ViewDetails'
import {SERVER_URL_EMPLOYEE,SERVER_URL} from "../Globals";
import Payroll from '../admin/Payroll/PayDetails';
import Task from '../admin/task/Task';
import EmployeeDetails from '../admin/EmployeeDetails/EmployeeDetails';
import AttendanceAdmin from '../admin/attendance/Attendance';
import LeaveResponse from '../admin/leave/LeaveResponse';
import Response from '../admin/leave/Response';
import Alltask from '../admin/task/Alltask';
import EmpPerformance from '../admin/PerformanceChart/EmpPerformance';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FontColorsOutlined,

} from '@ant-design/icons';
import { LogoutOutlined } from '@ant-design/icons';

import axios from 'axios';
import Home from '../home/Home';

const { Header, Sider, Content, Footer } = Layout;
const { Text, Link } = Typography;
function Dashboard() {
  //const navigate = useNavigate();
  const [state, setState] = useState({
    collapsed: false,
  })
  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  const email = localStorage.getItem('email')
  console.log('email1', email)
  const logout = () => {
    const email = localStorage.getItem('email')
    console.log('email', email)
    const id = localStorage.getItem('attendanceId')

    axios.post(SERVER_URL_EMPLOYEE + `logout?id=${id}&email=${email}`).then(result => {
      console.log(result.data);
      localStorage.clear();
      window.location.href = '/';
      // window.location.href='/home'
    }).catch(err => {
      console.log('err', err.message);
    })
  }


  return (

    <Router>
      <Layout >
        <Sider
          trigger={null}
          collapsible
          collapsed={state.collapsed}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'sticky',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <div className="logo">
            HRINFO
          </div>
          <Menu theme="dark" mode="inline" >
            {Dashboard_data.map((val, key) => {
              return (
                <Menu.Item key={key} icon={val.icon}>

                  <NavLink style={{ textDecoration: 'none' }} to={val.link}>
                    <span>{val.title}</span>
                  </NavLink>

                </Menu.Item>
              )
            }
            )}
            <Menu.Item icon={<LogoutOutlined />} key="13" onClick={logout} >Logout</Menu.Item>
          </Menu>

        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0, position: "sticky" }}>
            {React.createElement(state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}

          </Header>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div style={{ padding: 24, background: "#fff" }}>
              <Routes>
              <Route exact path="/payslip" element={<PaySlip />}></Route>
              <Route exact path="/emplyeedetails" element={<EmployeeDetails />}></Route>
              <Route exact path="/home" element={<Home />}></Route>
              <Route exact path="/leave" element={<Leave />}></Route>
              <Route exact path="/payroll" element={<Payroll />}></Route>
              <Route exact path="/viewdetails" element={<ViewDetails />}></Route>
              <Route exact path="/" element={<AdminHome />}></Route>
              <Route exact path="/addemployee" element={<AddEmployee />}></Route>
              <Route exact path="/attendance" element={<AttendanceAdmin/>}/>
              <Route exact path="/leaveresponse" element={<LeaveResponse />}></Route>
              <Route exact path="/response" element={<Response />}></Route>
              <Route exact path="/task" element={<Task />}></Route>
              <Route exact path="/alltask" element={<Alltask />}></Route>
              <Route exact path="/empperformance" element={<EmpPerformance />}></Route>

              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            HRINFO webapp @ 2022
          </Footer>
        </Layout>

      </Layout>
    </Router>
  )
}
export default Dashboard;
