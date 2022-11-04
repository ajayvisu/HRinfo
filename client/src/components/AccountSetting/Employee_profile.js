import React, { useState } from "react";
import './Employee_profile.css'



const Employee_profile = () =>{

const [number, setMobile] = useState(localStorage.getItem('mobile'))
const [id, setId] = useState(localStorage.getItem('id'))
const [email, setEmail] = useState(localStorage.getItem('email'))
const [change,setChange] = useState(true);

const Edit = () =>{

   setChange(false);
}


    return(<>
<div class="container">
    <div class="row">
        <div class="col-md-12">
<div class="container">
   <div class="row">
      <div class="col-md-12">
         <div id="content" class="content content-full-width">
            <div class="profile">
               <div class="profile-header">
                  <div class="profile-header-cover"></div>
                  <div class="profile-header-content">
                     <div class="profile-header-img">
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt=""/>   
                     </div>
                     <div class="profile-header-info">
                        <h4 class="m-t-10 m-b-5">{localStorage.getItem('name')}</h4>
                        <p class="m-b-10">Web And Frontend Developer</p>
                        {/* <button type="button"  class="btn btn-xs btn-success">Edit Profile</button> */}
                        <input type="file" id="myfile" name="myfile"/>
                     </div>
                  </div>
 
               </div>
            </div>
            <div class="profile-content">
                <div class="tab-content p-0">

                   <div class="tab-pane fade in active show" id="profile-about">
                     <div class="table-responsive">
                        <table class="table table-profile">
                           <thead>
                              <tr>
                                 <th></th>
                                 <th>
                                    <h4>{localStorage.getItem('name')}<small>Lorraine Stokes</small></h4>
                                 </th>
                              </tr>
                           </thead>
                           <tbody>
                              <tr class="highlight">
                                 <td class="field">Cantact</td>
                                 <td><button type="button" onClick={Edit}>Add Your Cantact</button></td>
                              </tr>
                              <tr class="divider">
                                 <td colspan="2"></td>
                              </tr>
                              <tr>
                                 <td class="field">Mobile </td>
                                 <td><input type="text" value={number} placeholder="Number" disabled = {change} /></td>
                              </tr>
                              <tr>
                                 <td class="field">Email </td>
                                 <td><span>{email}</span></td>
                              </tr>
                              <tr>
                                 <td class="field">ID</td>
                                 <td>{id}</td>
                              </tr>
                              <tr class="divider">
                                 <td colspan="2"></td>
                              </tr>
                              <tr class="highlight">
                                 <td class="field">About Me</td>
                                 <td><button type="button" onClick={Edit}>Add Description</button></td>
                              </tr>
                              <tr class="divider">
                                 <td colspan="2"></td>
                              </tr>
                              <tr>
                                 <td class="field">Country/Region</td>
                                 <td>
                                    <select class="form-control input-inline input-xs" name="region">
                                       <option value="US" selected="">United State</option>
                                       <option value="AF">Afghanistan</option>
                                       <option value="AL">Albania</option>
                                       <option value="DZ">Algeria</option>
                                       <option value="AS">American Samoa</option>
                                       <option value="AD">Andorra</option>
                                       <option value="AO">Angola</option>
                                       <option value="AI">Anguilla</option>
                                       <option value="AQ">Antarctica</option>
                                       <option value="AG">Antigua and Barbuda</option>
                                       <option value="IN">India</option>
                                    </select>
                                 </td>
                              </tr>
                              <tr>
                                 <td class="field">City</td>
                                 <td><input type="text" value="Los Angeles"  placeholder="Number" disabled = {false} /></td>
                              </tr>
                              <tr>
                                 <td class="field">State</td>
                                 <td><input type="text" value="Tamil Nadu"  placeholder="Number" disabled = {false} /></td>
                              </tr>
                              <tr>
                                 <td class="field">Gitup-Link</td>
                                 <td><a href="javascript:;">Add Webpage</a></td>
                              </tr>
                              <tr>
                                 <td class="field">Gender</td>
                                 <td>
                                    <select class="form-control input-inline input-xs" name="gender">
                                       <option value="male">Male</option>
                                       <option value="female">Female</option>
                                    </select>
                                 </td>
                              </tr>
                              <tr>
                                 <td class="field">Birthdate</td>
                                 <td>
                                 <input type="text"  placeholder="DOB" disabled = {false} />
                                 </td>
                              </tr>
                              <tr>
                                 <td class="field">Language</td>
                                 <td>
                                    <select class="form-control input-inline input-xs" name="language">
                                       <option value="TA" selected="">Tamil</option>
                                       <option value="EN">English</option>
                                    </select>
                                 </td>
                              </tr>
                              <tr class="highlight">
                                 <td class="field">Education</td>
                                 <td><button type="button" onClick={Edit}>Add Your Education</button></td>
                              </tr>
                              <tr class="divider">
                                 <td colspan="2"></td>
                              </tr>
                              <tr>
                                 <td class="field">Degree </td>
                                 <td><input type="text" value={''} placeholder="Number" disabled = {change} /></td>
                              </tr>
                              <tr>
                                 <td class="field">Specialization </td>
                                 <td><span>{''}</span></td>
                              </tr>
                              <tr>
                                 <td class="field">institue</td>
                                 <td>{''}</td>
                              </tr>
                              <tr>
                                 <td class="field">passingYear</td>
                                 <td>{''}</td>
                              </tr>
                              <tr>
                                 <td class="field">startDate</td>
                                 <td>{''}</td>
                              </tr>
                              <tr>
                                 <td class="field">endDate</td>
                                 <td>{''}</td>
                              </tr>
                              <tr class="highlight">
                                 <td class="field">Experience</td>
                                 <td><button type="button" onClick={Edit}>Add Your Experience</button></td>
                              </tr>
                              <tr class="divider">
                                 <td colspan="2"></td>
                              </tr>
                              <tr>
                                 <td class="field">organization </td>
                                 <td><input type="text" value={''} placeholder="Number" disabled = {change} /></td>
                              </tr>
                              <tr>
                                 <td class="field">designation </td>
                                 <td><span>{''}</span></td>
                              </tr>
                              <tr>
                                 <td class="field">startDate</td>
                                 <td>{''}</td>
                              </tr>
                              <tr>
                                 <td class="field">endDate</td>
                                 <td>{''}</td>
                              </tr>

                              <tr class="divider">
                                 <td colspan="2"></td>
                              </tr>
                              <tr class="highlight">
                                 <td class="field">Bank Details</td>
                                 <td><button type="button" onClick={Edit}>Add Your Bank Details</button></td>
                              </tr>
                              <tr class="divider">
                                 <td colspan="2"></td>
                              </tr>
                              <tr>
                                 <td class="field">Bank Name </td>
                                 <td><input type="text" value={''} placeholder="Number" disabled = {change} /></td>
                              </tr>
                              <tr>
                                 <td class="field">Recipient Name </td>
                                 <td><span>{''}</span></td>
                              </tr>
                              <tr>
                                 <td class="field">Account Number</td>
                                 <td>{''}</td>
                              </tr>
                              <tr>
                                 <td class="field">IFSC Code</td>
                                 <td>{''}</td>
                              </tr>

                              <tr class="divider">
                                 <td colspan="2"></td>
                              </tr>
                              <tr class="highlight">
                                 <td class="field">&nbsp;</td>
                                 <td class="p-t-10 p-b-10">
                                    <button type="submit" class="btn btn-primary width-150">Update</button>
                                    <button type="submit" class="btn btn-white btn-white-without-border width-150 m-l-5">Cancel</button>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
    	</div>
	</div>
</div>
        
    </>)
}

export default Employee_profile;