import { Layout, Menu, Result } from 'antd';
import { Typography, Space, Modal } from 'antd';
import React, {useState, useEffect} from 'react';
import Dashboard_data from './Dashboard_data';
import { NavLink, withRouter } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes,useNavigate } from 'react-router-dom';
import Home from "../home/Home";
import 'antd/dist/antd.css';
import './Dashboard.css'
import Contact from '../Contact/Contact';
import AccountSetting from '../AccountSetting/AccountSetting';
import Leave from '../leave/Leave';
import Emp from '../emp/Emp';
import Performance from '../PerformanceChart/PerformanceChart';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FontColorsOutlined,
  
} from '@ant-design/icons';
import {  LogoutOutlined } from '@ant-design/icons';
import Emp_dashbord from '../Emp_dashbord/Emp_dashbord';
import Employee_list from '../Employee_list/Employee_list';
import Employee_profile from '../AccountSetting/Employee_profile';
import axios from 'axios';
  const { Header, Sider, Content, Footer } = Layout;
  const { Text, Link } = Typography;
  
  
  function Dashboard(){
    const [ state, setState ] = useState({
        collapsed: false,
    })
    const toggle = () => {
        setState({
          collapsed: !state.collapsed,
        });
    };

  
    const logout = () =>{
      const empid = localStorage.getItem('email')

      axios.post('http://localhost:4000/api/emp/logout', empid).then(result=>{
        console.log(result.data);
      }).catch(err=>{
        console.log('err',err.message);
      })
    }

   
    return(
    
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
              {Dashboard_data.map((val, key)=>{
                   return (
              <Menu.Item key = {key} icon = {val.icon}>
            
                    <NavLink style={{ textDecoration: 'none' }} to= {val.link}>    
                    <span>{val.title}</span>
                    </NavLink>
 
              </Menu.Item>
                   )}
              )}
                <Menu.Item icon = {<LogoutOutlined />} key = "13" onClick={logout} >Logout</Menu.Item> 
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
          <div style={{ padding: 24, background: "#fff"}}>
            <Routes>
            
            <Route exact path="/contact" element= {<Contact/>} />
            <Route path="/" element={<Home />}></Route>
            <Route path="/leave" element={<Leave />}></Route>
            <Route path="/emp" element={<Emp />}></Route>
            <Route path="/account" element={<AccountSetting />}></Route>
            <Route path="/profile" element={<Employee_profile />}></Route>
            <Route path="/pro" element={<Emp_dashbord/>}></Route>
            <Route path="/dashbord" element={<Employee_list/>}></Route>
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