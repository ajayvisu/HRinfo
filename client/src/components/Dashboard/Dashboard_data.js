
import {
    WindowsOutlined,
    UsergroupAddOutlined,
    ClockCircleOutlined,
    StarOutlined,
    UserAddOutlined,
    PhoneOutlined,
    ScheduleOutlined ,
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
    // {
    //     key: 3,
    //     title: "Leave",
    //     icon: <CalendarOutlined />,
    //     link: "/leave",
    // },
    // {
    //     key: 4,
    //     title: "Performance",
    //     icon: <StarOutlined />,
    //     link: "/performance",
    // },
    {
        key: 3,
        title: "Attendance",
        icon: <ClockCircleOutlined />,
        link: "/attendance",
    },
   
    {
        key: 4,
        title: "AddEmployee",
        icon: <UserAddOutlined />,
        link: "/addemployee",
    },
     {
        key: 5,
        title: "Task",
        icon: <ScheduleOutlined  />,
        link: "/task",
    },
    {
        key: 6,
        title: "Transaction",
        icon: <SettingOutlined />,
        link: "/payroll",
    },

]

export default SidebarData;