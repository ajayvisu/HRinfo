import axios from "axios";
import React, { useState } from "react";
import "./AddEmp.css";
import { SERVER_URL_EMPLOYEE,  SERVER_URL_TRANSACTION } from "../../Globals";


const AddEmp = () => {

const[name ,setName] = useState('');
const[mail ,setMail] = useState('');
const[mobile ,setMobile] = useState('');
const[gender ,setGender] = useState('');
const[DOB ,setDOB] = useState('');
const[role ,setRole] = useState('');
const[address ,setAddress] = useState('');
const[salary ,setSalary] = useState('');
const[DOJ ,setDOJ] = useState('');
const[domain, setDomain] = useState('');
const[organization ,setorganization] = useState('');
const[designation ,setdesignation] = useState('');
const[startDate ,setstartDate] = useState('');
const[endDate ,setendDate] = useState('');
const[BankName ,setBankName] = useState('');
const[recipientName ,setrecipientName] = useState('');
const[accountNumber ,setaccountNumber] = useState('');
const[ifsc ,setifsc] = useState('');
const[tax ,settax] = useState('');
const[leave ,setleave] = useState('');
const[PF ,setPF] = useState('');


const deduction = () => {
const data = {
    tax   : tax,
    leave : leave,
    PF    : PF
}

    axios.post(SERVER_URL_TRANSACTION+'add-deduction',data).then(result=>{
        console.log('deduction',result.data);
        const deducID = result.data.deductionID
        AddEmp(deducID)
    }).catch(err => {        
        console.log('err',err.message);

    })
}



 const AddEmp = (id) =>{
    const data = {
        empName     : name,
        email        : mail,
        mobile       : mobile,
        gender       : gender,
        role         : role,
        password     : `${name}@hrinfo`,
        DOB          : DOB,
        DOJ          : DOJ,
        Address      : address,
        baseSalary   : salary,
        deductionID  : id ,
        domain       : domain,
        experience    :{
            organization : organization,
            designation : designation,
            
            startDate : startDate,
            endDate : endDate
        },
        bankDetails:{
            bankName:BankName,
            recipientName:recipientName,
            accountNumber:accountNumber,
            ifsc:ifsc
          }
        
    }
    console.log('data',data)
    axios.post(SERVER_URL_EMPLOYEE+"addEmployee",data).then(result => {
        console.log("data",result.data);
    }).catch(err=>{
        console.log('err1',err.message);
    })
 }


    return(<>
    <div class="container fluid">
                <div class="mt-5">
                        <h1 class="text-center" style={{ fontWeight: 'bold',paddingTop:'50px' }}>
                            <i class="fas fa-user-plus"></i>Employee Registration
                        </h1>
                        <form > 
                        <div className="mt-3">
                                <h3>Personal Details</h3>
                            </div>
                            <hr/>
                            <div class="form-group mt-4">
                                <label class="form-label" for="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    class="form-control"
                                   
                                    required
                                    onChange={(e)=>setName(e.target.value)}
                                />
                            </div>
                            <select class="form-select mt-4" name="gender" required  onChange={(e)=>setGender(e.target.value)} >
                                <option selected disabled>Gender</option> 
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                </select>
                            <div class="form-group mt-3">
                                <label for="dob" class="form-label">Date of Birth</label>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    class="form-control"
                                    
                                    onChange={(e)=>setDOB(e.target.value)}
                                    required
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label for="doj" class="form-label" >Date of Joining</label>
                                <input
                                    type="date"
                                    id="doj"
                                    name="doj"
                                    class="form-control"
                                    
                                    required

                                    onChange={(e)=>setDOJ(e.target.value)}
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label for="phone" class="form-label">Phone No.</label>
                                <input
                                    type="number"
                                    id="phone"
                                    name="phone"
                                    class="form-control"

                                    onChange={(e)=>setMobile(e.target.value)}

                                    required
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label for="Mail" class="form-label">Email</label>
                                <input
                                    type="text"
                                    class="form-control"
                              
                                    onChange={(e)=>setMail(e.target.value)}
                                    required
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label for="address" class="form-label">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    class="form-control"
                                   
                                    onChange={(e)=>setAddress(e.target.value)}
                                    required
                                />

                            </div>
                          
                            <div class="form-group mt-3">
                                <label for="designation" class="form-label">Domain</label>
                                <input
                                    type="text"
                                    id="designation"
                                    name="designation"
                                    class="form-control"
                                    onChange={(e)=>setDomain(e.target.value)}
                                    required
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label for="Role" class="form-label">Role</label>
                                <input
                                    type="text"
                                    id="Role"
                                    name="Role"
                                    class="form-control"
                                    onChange={(e)=>setRole(e.target.value)}
                                    required
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label for="base" class="form-label">Base Salary</label>
                                <input
                                    type="number"
                                    id="base"
                                    name="base"
                                    class="form-control"
                                    onChange={(e)=>setSalary(e.target.value)}
                                    required
                                />
                            </div>
                            
                            
                            <div className="mt-4">
                                <h3>Experience Details</h3>
                            
                            <hr/>
                            <div class="form-group mt-3">
                                <label  class="form-label" >Organization</label>
                                <input
                                    type="text"
                                    class="form-control"
                                   
                                    required
                                    onChange={(e)=>setorganization(e.target.value)}
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label  class="form-label" >Designation</label>
                                <input
                                    type="text"
                                    class="form-control"
                                  
                                    required
                                    onChange={(e)=>setdesignation(e.target.value)}
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label  class="form-label" >Start Date</label>
                                <input
                                    type="date"
                                    class="form-control"
                                    
                                    required
                                    onChange={(e)=>setstartDate(e.target.value)}
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label  class="form-label" >End Date</label>
                                <input
                                    type="date"
                                    class="form-control"
                                   
                                    required
                                    onChange={(e)=>setendDate(e.target.value)}
                                />
                            </div>
                            </div>
                            <div className="mt-4">
                                <h3>Bank Details</h3>
                            
                            <hr/>
                            <div class="form-group mt-3">
                                <label  class="form-label" >Bank Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                   
                                    required
                                    onChange={(e)=>setBankName(e.target.value)}
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label  class="form-label" >Recipient Name</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    
                                    required
                                    onChange={(e)=>setrecipientName(e.target.value)}
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label  class="form-label" >Account Number</label>
                                <input
                                    type="number"
                                    class="form-control"
                                   
                                    
                                    required
                                    onChange={(e)=>setaccountNumber(e.target.value)}
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label  class="form-label" >IFSC</label>
                                <input
                                    type="text"
                                    class="form-control"
                                 
                                    required
                                    onChange={(e)=>setifsc(e.target.value)}
                                />
                            </div>
                            </div>
                            <div className="mt-4">
                                <h3>Deduction Details</h3>
                            
                            <hr/>
                           
                            <div class="form-group mt-3">
                                <label  class="form-label" >Tax</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    
                                    required
                                    onChange={(e)=>settax(e.target.value)}
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label  class="form-label" >Leave</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    
                                    required
                                    onChange={(e)=>setleave(e.target.value)}
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label  class="form-label" >PF</label>
                                <input
                                    type="number"
                                    class="form-control"
                                   
                                    required
                                    onChange={(e)=>setPF(e.target.value)}
                                />
                            </div>
                            </div>
                            <div className="text-center">
                            <button type="button" onClick={deduction} className="btn btn-primary mt-5 col-3">
                                Register
                            </button></div>
                        </form>
                    </div>
            </div>
    </>)
} 



export default AddEmp;