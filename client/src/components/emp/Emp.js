import React, { useState ,useEffect} from "react";
import 'antd/dist/antd.css';
import {NavLink} from "react-router-dom";
import './Emp.css';

import {
  DashboardOutlined ,
  UserOutlined,
  ClockCircleOutlined, 
  BarChartOutlined,
  UserDeleteOutlined,
  DiffOutlined,
  TeamOutlined,
  MailOutlined,
  LogoutOutlined,
  AudioOutlined
} from '@ant-design/icons';
import { Layout, Menu, Input, Space  } from 'antd';
import Dash from "./Dash";








function Emp() {

  const { Search } = Input;
  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
  );
  const onSearch = (value) => console.log(value);


  const { Header, Content, Footer, Sider } = Layout;
    const menu = [
      {
        key : "1",
        title : 'Dashbord',
        icon : <DashboardOutlined/>,
        link : "/dashbord"
      },
      {
        key : "2",
        title : 'Profile',
        icon : <UserOutlined/>,
        link : "/profile"
      },
      {
        key : "3",
        title : 'TimeSheet',
        icon : <ClockCircleOutlined/>,
        link : "/timesheet"
      },
      {
        key : "4",
        title : 'Attendance',
        icon : <TeamOutlined/>,
        link : "/attendance"
      },
      {
        key : "5",
        title : 'Chart',
        icon : <BarChartOutlined/>,
        link : "/chart"
      },
      {
        key : "6",
        title : 'Leave',
        icon : <UserDeleteOutlined/>,
        link : "/leave"
      },
      {
        key : "7",
        title : 'Performs',
        icon : <DiffOutlined/>,
        link : "/perform"
      },
      {
        key : "8",
        title : 'Inbox',
        icon : <MailOutlined/>,
        link : "/inbox"
      },
      {
        key : "9",
        title : 'Logout',
        icon : <LogoutOutlined/>,
        link : "/logout"
      }
      
    ]
    // .map((sidemenue , index)=>({
    //   key: String(index + 1),
    //   icon: React.createElement(sidemenue.icon),
    //   label:sidemenue.title ,
    // }))

 

  return (<>
<Layout hasSider>
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        paddingTop : 50,
        backgroundColor:"white",
      }}
    >

      <div className="logo" />
      <Menu  mode="" style={{backgroundColor : ' rgb(14, 102, 235)'}} >

      <div className="pro">
        <div className="file">
          <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"/>
          <h6>Elon Musk</h6>
          <p>elonmusk@gmail.com</p>
        </div>
        <hr/>
      </div>
        {
          menu.map((val,key)=>{
            return(
          <>
              <Menu.Item key={key} icon = {val.icon}>
                <NavLink style={{textDecoration:'none'}} to={val.link}>
                  <span style={{color:'white'}}>{val.title}</span>
                </NavLink>
              </Menu.Item>
              <hr/>
          </>
            )
          })
        }
      </Menu>
    </Sider>
    <Layout
      className="site-layout"
      style={{
        marginLeft: 200,
      }}
    >
      

      <Header
        className="site-layout-background fixed-top bg-primary"
        style={{
          padding: 0,
         height : "50px"
        }}
      >
        <div className="logo">
   <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Hr-iNFO-Logo_2015.svg/1200px-Hr-iNFO-Logo_2015.svg.png"/>
   </div>
   {/* <div  className="search">
  <Space direction="vertical">
     <Search
      placeholder="Search"
      allowClear
      onSearch={onSearch}
      style={{
        width: 200,
      }}
    />
     </Space>
     </div> */}
     </Header>


      <Content
        style={{
          margin: '24px 16px 0',
          overflow: 'initial',
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            textAlign: 'center',
          }}
        >
          <br></br>
          <p>WORK CHART</p>

          {<Dash/>}

        
          {
            // Array.from(
            //   {
            //     length: 100,
            //   },
            //   (_, index) => (
            //     <React.Fragment key={index}>
            //       {index % 20 === 0 && index ? 'more' : '...'}
            //       <br />
            //     </React.Fragment>
            //   ),
            // )
          }
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        @Employe Name  2022-Oct Wellcome
      </Footer>
    </Layout>
  </Layout>

  </>
  )
}

export default Emp
