
import {
    WindowsOutlined,
    UsergroupAddOutlined,
    ClockCircleOutlined,
    StarOutlined,
    UserAddOutlined,
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
        link: "/emplyeedetails",
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
        link: "/attendance",
    },
    {
        key: 6,
        title: "Contact",
        icon: <PhoneOutlined />,
        link: "/contact",
    },
    {
        key: 7,
        title: "AddEmployee",
        icon: <UserAddOutlined />,
        link: "/addemployee",
    },
    {
        key: 7,
        title: "Transaction",
        icon: <SettingOutlined />,
        link: "/payroll",
    },

]

export default SidebarData;