import React, { useEffect, useState } from 'react'
import "./Maint.css";
import axios from 'axios';
const Maint = () => {
    const [emp ,setEmp] = useState('');
    const myEmployee = () =>{
      axios.get('http://localhost:4000/api/emp/getEmployee').then(result=>{
        console.log('employee data ,', result.data)
       
        setEmp(result.data);
      }).catch(err=>{
        console.log('err',err.message);
      })
     }
  useEffect(()=>{
    myEmployee()
  
  },[])
  return (
    <div>
    <head>
    {/* <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"/> */}

    </head>
      <section className="bg-light p-5">
        <h3 className="pb-2">Responsive Table</h3>
        <div className="table-responsive" id="no-more-tables">
            <table className="table bg-white">
                <thead className="bg-dark text-light">
                    <tr>
                        <th>Name</th>
                        <th>EmployeeID</th>
                        <th>MobileNumber</th>
                        <th>Loginstatus</th>
                    </tr>
                </thead>
                <tbody>
                   
                    <tr>
                        <td data-title="Name">Alisha</td>
                        <td data-title="EmployeeID">Roy</td>
                        <td data-title="MobileNumber">20</td>
                        <td data-title="Loginstatus">Kerala</td>
                    </tr>
                  
                   
                 
                  
                </tbody>
            </table>
        </div>
    </section>
    </div>
  );
};

export default Maint;
