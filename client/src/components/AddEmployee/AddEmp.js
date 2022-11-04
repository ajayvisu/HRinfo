import axios from "axios";
import React, { useState } from "react";
import "./AddEmp.css";


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

 const AddEmp = () =>{
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
        baseSalary   : salary
    }
    console.log('data',data)
    axios.post("http://localhost:4000/api/emp/addEmployee",data).then(result => {
        console.log("data",result.data);
    }).catch(err=>{
        console.log('err1',err.message);
    })
 }


    return(<>
    <div class="container fluid">
                <div class="mt-5">
                        <h1 class="text-center" style={{ fontWeight: 'bold',paddingTop:'50px' }}>
                            <i class="fas fa-user-plus"></i> Register Employee
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
                                    placeholder="Enter Name"
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
                                    placeholder="Enter Date of Birth"
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
                                    placeholder="Enter Date of Joining"
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
                                    placeholder="Enter Phone"

                                    onChange={(e)=>setMobile(e.target.value)}

                                    required
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label for="Mail" class="form-label">Email</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Enter Designation"
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
                                    placeholder="Enter Address"
                                    onChange={(e)=>setAddress(e.target.value)}
                                    required
                                />

                            </div>
                            {/* <div class="form-group mt-3">
                                <label for="dno" class="form-label">Department No.</label>
                                <input
                                    type="number"
                                    id="dno"
                                    name="dno"
                                    class="form-control"
                                    placeholder="Enter Department No."

                                    required
                                />
                            </div> */}
                            <div class="form-group mt-3">
                                <label for="designation" class="form-label">Designation</label>
                                <input
                                    type="text"
                                    id="designation"
                                    name="designation"
                                    class="form-control"
                                    placeholder="Enter Designation"
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
                                    placeholder="Enter Base Salary"
                                    onChange={(e)=>setSalary(e.target.value)}
                                    required
                                />
                            </div>
                            {/* <div className="mt-4">
                                <h3>Deduction Details</h3>
                            
                            <hr/>
                            <div class="form-group mt-3">
                                <label for="did" class="form-label" >Deduction Id.</label>
                                <input
                                    type="number"
                                    id="did"
                                    name="did"
                                    class="form-control"
                                    placeholder="Enter DId."

                                    required
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label for="tax" class="form-label" >Tax Deduction</label>
                                <input
                                    type="number"
                                    id="tax"
                                    name="tax"
                                    class="form-control"
                                    placeholder="Enter Tax"

                                    required
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label for="leave" class="form-label" >Deduction For Leave</label>
                                <input
                                    type="number"
                                    id="leave"
                                    name="leave"
                                    class="form-control"
                                    placeholder="Enter per day deduction"

                                    required
                                />
                            </div>
                            <div class="form-group mt-3">
                                <label for="loan" class="form-label" >PF Deduction</label>
                                <input
                                    type="number"
                                    id="loan"
                                    name="loan"
                                    class="form-control"
                                    placeholder="Enter Laon Deduction"

                                    required
                                />
                            </div>
                            </div> */}
                            <div className="text-center">
                            <button type="button" onClick={AddEmp} className="btn btn-primary mt-5 col-3">
                                Register
                            </button></div>
                        </form>
                    </div>
            </div>
    </>)
} 



export default AddEmp;