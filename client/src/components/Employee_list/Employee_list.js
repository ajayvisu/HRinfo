import React ,{useEffect,useState, useRef} from "react";
import './Employee_list.css'
import axios from "axios";
import { Button, Input, Space, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import Highlighter from 'react-highlight-words';


const Employee_list = () => {

  const [emp ,setEmp] = useState('');
  const myEmployee = () =>{
    axios.get('http://localhost:4000/api/emp/getEmployee').then(result=>{
      console.log('employee data ,', result.data.result)
      // for( let x of result.data.result) console.log("x",x.loginStatus)
      setEmp(result.data.result);
    }).catch(err=>{
      console.log('err',err.message);
    })
   }
  
   useEffect(()=>{
   myEmployee() 
   }, [])


   const [searchText, setSearchText] = useState('');
   const [searchedColumn, setSearchedColumn] = useState('');
   const searchInput = useRef(null);

   const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

//   const data = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     empID: i,
//     empName: `Edward King ${i}`,
//     role : 'user',
//     mobile: 32,
//     email: `London, Park. ${i}`,
//     loginStatus : true

//   });
// }


   const columns = [
    {
      key:'1',
      title: "ID",
      dataIndex : 'empID',
      render : (text) => <a>{text}</a>,
      width: 200,
      ...getColumnSearchProps('empID'),
    },
    {
      key:'2',
      title: "NAME",
      dataIndex : 'empName',
      width: 200,
      ...getColumnSearchProps('empName'),
    },
    {
      key :'3',
      title : "DESIGNATION",
      dataIndex : 'role',
      width : 200,
      filters : [
        {
          text : 'user',
          value : 'user'
        },
        {
          text : 'developer',
          value : 'developer'
        }
      ],
      onFilter : (value,record) => record.role.indexOf(value) == 0,
    },
    {
      key:'4',
      title: "EMAIL",
      dataIndex : 'email'
    },
    {
      key:'5',
      title: "MOBILE",
      dataIndex : 'mobile',
      width : 150,
    },
    {
      key:'6',
      title: "STATUS",
      dataIndex : 'loginStatus',
      width : 100,
      render : (text) => <>{text == true ? <span className="badge bg-success rounded-pill">online</span> : <span className="badge bg-danger rounded-pill">Ofline</span> }</>,
      filters : [
        {
          text : 'Online' ,
          value : true
        },
        {
          text : 'Ofline',
          value : false
        }
      ],
      onFilter : (value,record) => record.loginStatus.indexOf(value) == 0,
    }
   ]

   


  return (
      <>
<div className="App">
  <header className="App-header">
    <Table columns={columns} dataSource={emp}  pagination = {{ pageSize:10}} scroll={{ y: 270,}} ></Table>
  </header>
</div>



     
      </>
    

  );
};

export default Employee_list;