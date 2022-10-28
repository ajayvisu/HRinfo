
import {
    WindowsOutlined,
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
        icon: <WindowsOutlined />,
        link: "/",
    },
    {
        key: 2,
        title: "Employees",
        icon: <UsergroupAddOutlined />,
        link: "/employeeDetails",
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
        link: "/performance",
    },
    {
        key: 5,
        title: "Attendance",
        icon: <ClockCircleOutlined />,
        link: "/emp",
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
        link: "/account",
    },

]

export default SidebarData