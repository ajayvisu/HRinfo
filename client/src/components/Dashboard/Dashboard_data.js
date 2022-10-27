
import { 
    WindowsOutlined ,
    UsergroupAddOutlined,
    ClockCircleOutlined,
    StarOutlined,
    PhoneOutlined,
    SettingOutlined,
    CalendarOutlined

} from '@ant-design/icons';

const SidebarData = [
    {
        key: 1,
        title: "Dashboard",
        icon: <WindowsOutlined  />,
        link: "/dashbord",  
    },    
    {
        key: 2,
        title: "Employees",
        icon: <UsergroupAddOutlined />,
        link: "/contact",  
    },
    {
        key: 3,
        title: "Leave",
        icon: <CalendarOutlined />,
        link: "/leave",  
    },
    {
        key: 4,
        title: "Performance",
        icon: <StarOutlined />,
        link: "/pro",  
    },
    {
        key: 5,
        title: "Recruitment",
        icon: <ClockCircleOutlined />,
        link: "/",  
    },
    {
        key: 6,
        title: "Contact",
        icon: <PhoneOutlined />,
        link: "/contact",  
    },
    {
        key: 7,
        title: "Account Settings",
        icon: <SettingOutlined />,
        link: "/profile",  
    },
    
]

export default SidebarData