import React from "react";
import "./HomePage.css";
import { Breadcrumb, Layout, Menu, Carousel } from "antd";
import {
  HomeFilled,
  CustomerServiceFilled,
  LoginOutlined,
  ContactsFilled,
} from "@ant-design/icons";
import { Label } from "recharts";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const { Header, Footer, Sider, Content } = Layout;

  const contentStyle = {
    height: "400px",
    width:'50%',
    // color: "#fff",
    // lineHeight: "260px",
    // textAlign: "center",
    // background: "#364d79",
  };
  const Item2 = [
    {
      key: 1,
      title: "Home",
      icon: <HomeFilled />,
      link: "/home",
    },
    {
      key: 2,
      title: "Service",
      icon: <CustomerServiceFilled />,
      link: "/service",
    },
    {
      key: 3,
      title: "Contact",
      icon: <ContactsFilled />,
      link: "/contact",
    },
    {
      key: 4,
      title: "Login",
      icon: <LoginOutlined />,
      link: "/login",
    },
  ].map((val) => ({
    label: val.title,
    icon: val.icon,
    link: val.link,
  }));
  return (
    <>
      <Layout>
        <Header style={{ background: "white", display: "flex" }}>
          <span>hrInfo</span>
          <Menu
            theme="light"
            mode="horizontal"
            style={{ paddingLeft: "800px" }}
            items={Item2}
          />
        </Header>
        <Content>
          <Carousel autoplay>
            <div>
              <img className="contentStyle" src="https://english.osu.edu/sites/default/files/styles/callout_boxes/public/2020-06/student_on_laptop.jpg?h=e91a75a9&itok=X4ZWqxdO"  />
            </div>
            <div>
              <img className="contentStyle"  src="https://english.osu.edu/sites/default/files/styles/callout_boxes/public/2020-07/resources_call_out_box.jpg?h=e91a75a9&itok=cRC_VS4e"  />
            </div>
            <div>
              <img  className="contentStyle" src="https://miro.medium.com/max/720/0*LNRTDbFAk1sRMKYy"  />
            </div>
            <div>
              <img  className="contentStyle" src="https://demo.w3layouts.com/demos_new/template_demo/18-12-2019/eccentricportfolio-liberty-demo_Free/810562296/web/assets/images/g1.jpg" />
            </div>
          </Carousel>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </>
  );
};

export default HomePage;
