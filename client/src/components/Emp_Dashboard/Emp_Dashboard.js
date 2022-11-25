import { Layout, Menu, Result } from 'antd';
import { Typography, Space, Modal } from 'antd';
import React, { useState, useEffect } from 'react';
import Emp_Dashboard_data from './Emp_Dashboard_data'
import { NavLink, withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

import 'antd/dist/antd.css';
import './Emp_Dashboard.css'
import Leave from '../employee/leave/Leave'
import Performance from '../employee/PerformanceChart/PerformanceChart';
import { SERVER_URL_EMPLOYEE, SERVER_URL } from "../Globals";

import AccountSetting from '../employee/AccountSetting/Employee_profile';
import Contact from '../employee/Contact/Contact';
import Dashboard from "../Dashboard/Dashboard";
import Attendance from '../employee/attendance/Attendance';
import EmpTask from '../employee/emptask/EmpTask';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FontColorsOutlined,

} from '@ant-design/icons';
import { LogoutOutlined } from '@ant-design/icons';

import axios from 'axios';

const { Header, Sider, Content, Footer } = Layout;
const { Text, Link } = Typography;


function Emp_Dashboard() {

  // const navigate = useNavigate();
  const [state, setState] = useState({
    collapsed: false,
  })
  const toggle = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };


  // const email = localStorage.getItem('email')
  // console.log('email1', email)
  const email = localStorage.getItem('email')
  console.log('email1', email)
  const logout = () => {
    const email = localStorage.getItem('email')
    console.log('email', email)
    const id = localStorage.getItem('attendanceId')
    console.log("id",id)

    axios.post(`http://localhost:4000/api/v1/emp/logout?id=${id}&email=${email}`).then(result => {
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
            {Emp_Dashboard_data.map((val, key) => {
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


                <Route path="/leave" element={<Leave />}></Route>
                <Route path="/performance" element={<Performance />}></Route>
                <Route path="/profile" element={<AccountSetting />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path='/attendance' element={<Attendance />} />
                <Route path='/emptask' element={<EmpTask />} />

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
export default Emp_Dashboard;
