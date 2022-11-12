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
import Performance from '../admin/PerformanceChart/PerformanceChart';
import AddEmployee from '../admin/AddEmployee/AddEmp';
import AdminHome from '../admin/adminHome/AdminHome';
import ViewDetails from '../admin/ViewDetails/ViewDetails'
import AccountSetting from '../employee/AccountSetting/Employee_profile';
import Payroll from '../admin/Payroll/PayDetails';
import Contact from '../admin/Contact/Contact';
import EmployeeDetails from '../admin/EmployeeDetails/EmployeeDetails';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FontColorsOutlined,

} from '@ant-design/icons';
import { LogoutOutlined } from '@ant-design/icons';

import axios from 'axios';

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


  const logout = () => {
    const empid = localStorage.getItem('email')

    axios.post(`http://localhost:4000/api/emp/logout?id=${empid}`).then(result => {
      console.log(result.data);
      localStorage.clear();
    //  navigate('/')
      
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
              <Route path="/payslip" element={<PaySlip />}></Route>

              <Route path="/" element={<Contact />}></Route>
              <Route path="/emplyeedetails" element={<EmployeeDetails />}></Route>
              <Route path="/leave" element={<Leave />}></Route>
              <Route path="/performance" element={<Performance />}></Route>
              <Route path="/profile" element={<AccountSetting />}></Route>
              <Route path="/payroll" element={<Payroll />}></Route>
              <Route path="/viewdetails" element={<ViewDetails />}></Route>
              <Route path="/adminHome" element={<AdminHome />}></Route>
              <Route path="/addemployee" element={<AddEmployee />}></Route>
              <Route path="/contact" element={<Contact/>}/>
          
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
