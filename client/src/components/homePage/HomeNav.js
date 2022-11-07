import React from "react";
import { HomeFilled,CustomerServiceFilled,LoginOutlined,ContactsFilled} from '@ant-design/icons';
import { Breadcrumb,Layout,Menu, Carousel} from 'antd';


const HomeNav = [
    {
        key:1,
        title:'Home',
        icon : <HomeFilled />,
        link : '/home'
    }, {
        key:2,
        title:'Service',
        icon : <CustomerServiceFilled />,
        link : '/service'
    },   {
        key:3,
        title:'Contact',
        icon : <ContactsFilled />,
        link : '/contact'
    },  {
        key:4,
        title:'Login',
        icon : <LoginOutlined />,
        link : '/login'
    }
]

export default HomeNav;