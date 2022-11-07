import React, { useState } from "react";
import "./SignUp.css";


function SignUp() {
  
    const [empID, setempId] = useState("");
    const [password, setpassword] = useState("");

    return (
        <>
            <div class="row mt-5">
                <div class="col-md-6 m-auto">
                    <div class="card card-body" style={{ width: "120%", marginTop: '-40px', marginRight: '20px' }}>
                        <h1 class="text-center mb-3" style={{ fontWeight: 'bold' }}>
                            <i class="fas fa-user-plus"></i> Register Employee
                        </h1>
                     
                        <form >
                            <div>
                                <h3>Login Details</h3>
                            </div>
                            <div class="form-group">
                                <label for="uname">User Name</label>
                                <input
                                    type="text"
                                    id="uname"
                                    name="uname"
                                    class="form-control"
                                    placeholder="Enter User Name"

                                />
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    class="form-control"
                                    placeholder="Create Password"
                                    required
                                />
                            </div>
                            <div>
                                <h3>Personal Detail</h3>
                            </div>
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input
                                    type="name"
                                    id="name"
                                    name="name"
                                    class="form-control"
                                    placeholder="Enter Name"
                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="eid">Employee Id.</label>
                                <input
                                    type="number"
                                    id="eid"
                                    name="eid"
                                    class="form-control"
                                    placeholder="Enter EId."

                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="gender">Gender</label>
                                <input
                                    type="text"
                                    id="gender"
                                    name="gender"
                                    class="form-control"
                                    placeholder="Enter Gender"

                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="dob">Date of Birth</label>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    class="form-control"
                                    placeholder="Enter Date of Birth"

                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="doj">Date of Joining</label>
                                <input
                                    type="date"
                                    id="doj"
                                    name="doj"
                                    class="form-control"
                                    placeholder="Enter Date of Joining"

                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone No.</label>
                                <input
                                    type="number"
                                    id="phone"
                                    name="phone"
                                    class="form-control"
                                    placeholder="Enter Phone"

                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="address">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    class="form-control"
                                    placeholder="Enter Address"

                                    required
                                />

                            </div>
                            <div class="form-group">
                                <label for="dno">Department No.</label>
                                <input
                                    type="number"
                                    id="dno"
                                    name="dno"
                                    class="form-control"
                                    placeholder="Enter Department No."

                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="designation">Designation</label>
                                <input
                                    type="text"
                                    id="designation"
                                    name="designation"
                                    class="form-control"
                                    placeholder="Enter Designation"

                                    required
                                />
                            </div>
                            <div>
                                <h3>Salary</h3>
                            </div>
                            <div class="form-group">
                                <label for="sid">Salary Id.</label>
                                <input
                                    type="number"
                                    id="sid"
                                    name="sid"
                                    class="form-control"
                                    placeholder="Enter SId."

                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="base">Base Salary</label>
                                <input
                                    type="number"
                                    id="base"
                                    name="base"
                                    class="form-control"
                                    placeholder="Enter Base Salary"

                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="hra">HRA</label>
                                <input
                                    type="number"
                                    id="hra"
                                    name="hra"
                                    class="form-control"
                                    placeholder="Enter HRA"

                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="da">DA</label>
                                <input
                                    type="number"
                                    id="da"
                                    name="da"
                                    class="form-control"
                                    placeholder="Enter DA"

                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="ma">MA</label>
                                <input
                                    type="number"
                                    id="ma"
                                    name="ma"
                                    class="form-control"
                                    placeholder="Enter MA"

                                    required
                                />
                            </div>
                            <div>
                                <h3>Deduction Details</h3>
                            </div>
                            <div class="form-group">
                                <label for="did">Deduction Id.</label>
                                <input
                                    type="number"
                                    id="did"
                                    name="did"
                                    class="form-control"
                                    placeholder="Enter DId."

                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="tax">Tax Deduction</label>
                                <input
                                    type="number"
                                    id="tax"
                                    name="tax"
                                    class="form-control"
                                    placeholder="Enter Tax"

                                    required
                                />
                            </div>

                            <div class="form-group">
                                <label for="leave">Deduction For Leave</label>
                                <input
                                    type="number"
                                    id="leave"
                                    name="leave"
                                    class="form-control"
                                    placeholder="Enter per day deduction"

                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="pf">Provident Fund</label>
                                <input
                                    type="number"
                                    id="pf"
                                    name="pf"
                                    class="form-control"
                                    placeholder="Enter PF"

                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="wf">Welfare Fund</label>
                                <input
                                    type="number"
                                    id="wf"
                                    name="wf"
                                    class="form-control"
                                    placeholder="Enter WF"

                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="loan">Loan Deduction</label>
                                <input
                                    type="number"
                                    id="loan"
                                    name="loan"
                                    class="form-control"
                                    placeholder="Enter Laon Deduction"

                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label for="bus">Hostel/Bus Charges</label>
                                <input
                                    type="number"
                                    id="bus"
                                    name="bus"
                                    class="form-control"
                                    placeholder="Enter Hostel/Bus Charges"

                                    required
                                />
                            </div>

                            <button type="submit" class="btn btn-primary btn-block">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;