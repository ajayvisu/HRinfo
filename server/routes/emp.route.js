const router = require("express").Router();
const employeeSchema = require("../models/emp.model");
const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const leaveSchema = require("../models/leave.model");
const deductionSchema= require("../models/deduction.model")
const sendMail = require("../middleware/mail");
const multer = require('multer');
const e = require("express");
require("dotenv").config();
const attendanceSchema = require('../models/attendance.model')

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
  return cb(null,'uploads')
  },
  filename:(req,file,cb)=>{
  return cb(null,Date.now()+'_'+file.originalname)
  }
})

router.put("/updateimage", async (req, res) => {
  try {
    console.log(req.body,req.file,req.query)
    const id = req.query.id;
    const upload = multer({storage:storage}).single('file')

    upload(req, res, async function (err) {
      if (!req.file) {
        return res.send("Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }
      reqData = {
        image:req.file.filename   
      }
      const data = await employeeSchema.findOneAndUpdate({_id:id},reqData,{ new: true }).exec()
      if(data){
          return res.status(200).json({ 'status': 'success', "message": " successfully added", "result": data })
      }else{
          return res.status(200).json({ 'status': 'failed', "message": "somthing went wrong" })
      }
    });
 
} catch (error) {
  console.log(error.message);
  return res.status(400).json({ "status": 'failure', 'message': error.message })
}
});
router.post("/addEmployee", async (req, res) => {
  try {
    let empName = req.body.empName;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let gender = req.body.gender;
    let role = req.body.role;
    let password = req.body.password;
    let tax = req.body.tax;
    let leave = req.body.leave;
    let PF = req.body.PF
    if (empName) {
      let Name = await employeeSchema.findOne({ empName: empName }).exec();
      if (Name) {
        return res
          .status(400)
          .json({ status: "failed", message: "employee name already exist" });
      }
    } else {
      return res
        .status(404)
        .json({ status: "failed", message: "Please enter employee name" });
    }
    if (email) {
      let mail = await employeeSchema.findOne({ email: email }).exec();
      if (mail) {
        return res.status(400).json({
          status: "failed",
          message: "employee email_id already exist!",
        });
      }
    } else {
      return res
        .status(404)
        .json({ status: "failed", message: "Please enter employee mail id" });
    }

    if (mobile) {
      let phone = await employeeSchema.findOne({ mobile: mobile }).exec();
      if (phone) {
        return res.status(400).json({
          status: "failed",
          message: "employee mobile number already exist!",
        });
      }
    } else {
      return res.status(404).json({
        status: "failed",
        message: "Please enter employee mobile number",
      });
    }
    let user = new deductionSchema(req.body);
     await user.save().then(async function(deduction){
    req.body.deducationId = deduction._id
    console.log("deduction",deduction._id)
    console.log("req.body.deducationId",req.body.deducationId)
     
    let employeeData = await employeeSchema(req.body);

      const salt = await bcrypt.genSalt(10);
      employeeData.password = bcrypt.hashSync(password, salt);
  
      employeeData
        .save()
        .then((result) => {
          return res.status(201).json({
            status: "success",
            message: "employee data successfully created!",
            result: result,
          });
        })
        .catch((err) => {
          return res
            .status(400)
            .json({ status: "failure", message: err.message });
        });
    })
  
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});


router.post("/emp-leave", (req, res) => {
  let id = req.query.id;
  employeeSchema
    .findOne({ _id: id })
    .populate("leaves")
    .exec((err, employee) => {
      // console.log('user', employee)
      // console.log('req.params._id', id)
      if (err) {
        res.json({ err: err.message });
      } else {
        let startDate = moment(req.body.from).format("DD/MM/YYYY");
        // console.log('startDate', typeof(startDate))
        let endDate = moment(req.body.to).format("DD/MM/YYYY");
        let sDate = moment(req.body.from).format("DD"); //get leave start date only
        let eDate = moment(req.body.to).format("DD"); //get leave endday date only
        req.body.days = eDate - sDate + 1;
        let todayDate = moment().format("DD");
        // console.log("todayDate", todayDate);
        let from = employee.email;

        const mailData = {
          from: employee.email,
          to: "sajna.platosys@gmail.com",
          subject: "Leave Permission",
          text: `Leave start ${startDate} to ${endDate}`,
        };

        if (todayDate < sDate) {
          let sendingMail = sendMail.sendMail(mailData);
          if (!sendingMail) {
            console.log("mail not sending");
          } else {
            leaveSchema.create(req.body, (err, newLeave) => {
              console.log("newleavenewleave", newLeave);
              if (err) {
                return res
                  .status(200)
                  .json({ status: "failed", message: err.message });
              } else {
                newLeave.employee.id = employee._id;
                newLeave.employee.empName = employee.empName;
              
                newLeave.save();
                employee.leaves.push(newLeave);
                employee.save().then((result) => {
                  res.status(200).json({ status: "success", result: result });
                });
              }
            });
          }
        } else {
          res.json({ status: "success", message: "ghv" });
        }
      }
    });
});
router.get("/getIndivData", async (req, res) => {
  try {
    const data = await employeeSchema.findOne({ _id: req.query.id }).exec();
    if (data) {
      return res.json({ status: "success", result: data });
    } else {
      return res.json({ status: "failure", message: "user not exist" });
    }
  } catch (err) {
    return res.json({ err: err.message });
  }
})

router.put("/imag_update",async (req,res) => {
  try {
    const data = await employeeSchema.findOneAndUpdate({ email: req.query.email },{image : req.body.image},{new:true})
    .then(result => {
      res.json({status:'succuss',message : 'image successfully added',result});
    }).catch(err => {
      res.json({status:'failure',message:err.message,})
    })


  } catch (error) {
    return res.json({ error: error.message }); 
  }
})


router.get('/myleavedetails', async (req, res) => {
  try {
    let myleave = await employeeSchema.findOne({ _id: req.query.id })
      .populate('leaves')
      .exec((err, data) => {
        console.log('data', data)
        return res.status(200).json({ status: 'success', message: 'data fetched successfully', result: data.leaves })
      })
  } catch (err) {
    return res.json({ 'err': err.message })
  }

})

router.get('/getEmployee', async (req, res) => {
  try {
    const Employees = await employeeSchema.find({role:"user"}).exec();
    if (Employees.length > 0) {
      return res.status(200).json({ status: "success", message: 'Data feched successfully', "result": Employees })
    } else {
      return res.status(400).json({ status: "failure", message: "somthing went wrong!" })
    }

  } catch (err) {
    return res.json({ 'err': err.message })
  }
})
const time = moment().format("DD/MM/YYYY")
console.log('time', time)
console.log('hr', time)
console.log('minit', time)

router.get("/get-single-emp-details", async (req, res) => {
  try {
    console.log('req.query._id ', req.query._id)
    const employeeDetails = await employeeSchema.findOne({ "_id": req.query._id }).exec();
    if (employeeDetails) {
      return res.status(200).json({ 'status': 'success', message: "employeeDetails fetched successfully", 'result': employeeDetails });
    } else {
      return res.status(404).json({ 'status': 'failure', message: "No employeeDetails available" })
    }
  } catch (error) {
    consoyle.log(error.message);
    return res.status(400).json({ "status": 'failure', 'message': error.message })
  }
});


router.get("/loginstatus", async (req, res) => {
  try {
    let loginUsers = await employeeSchema.find({ loginStatus: true }).exec()
    let totalUsers = await employeeSchema.find().exec()
    console.log('loginstatus', loginUsers.length)
    if (loginUsers.length > 0) {
      return res.status(200).json({ status: true, message: "data fetched", loginUsers: loginUsers.length, totalUsers: totalUsers.length })
    } else {
      return res.status(200).json({ status: true, message: "All users are in off line" })
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ status: false, 'message': error.message })
  }
})

router.put("/update", async (req, res) => {
  try {
    const id = req.query.id;
    
    console.log(id)
    await employeeSchema.findOneAndUpdate({ _id: id }, req.body, { new: true }).then(result => {
      res.json({ status: 'success', message: 'data successfully updated!', 'result': result })
    }).catch(err => {
      console.log(err.message)
      res.json({ 'err': err.message })
    })
  } catch (error) {
    return res.status(400).json({ status: false, 'message': error.message })
  }
})

router.get('/leave-status', async (req, res) => {
  try {
    let pendingLeave = await leaveSchema.find({ status: "pending" }).exec()
    let approvedLeave = await leaveSchema.find({ status: "approved" }).exec()
    let totalEmp = await employeeSchema.find().exec()
    let todayLeave = await employeeSchema.find({ loginStatus: false }).exec()

    return res.status(200).json({
      status: true, message: "data fetched", pendingLeave: pendingLeave.length,
      approvedLeave: approvedLeave.length,
      totalEmp: totalEmp.length,
      todayLeaveCount: todayLeave.length
    })
  } catch (error) {
    return res.status(400).json({ status: false, 'message': error.message })
  }
})

router.get('/today-leave', async (req, res) => {
  try {
    let todayLeave = await employeeSchema.find({ loginStatus: false }).exec()

    let present = await employeeSchema.find({ loginStatus: true }).exec()
    return res.status(200).json({ status: true, message: "data fetched", todayLeaveCount: todayLeave.length, todayLeave: todayLeave, present: present })
  } catch (error) {
    return res.status(400).json({ status: false, 'message': error.message })
  }
})
router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    // let attendancedata;
    let email = req.body.email;
    let password = req.body.password;
    const time = moment().format("DD/MM/YYYY, hh:mm a");
    await employeeSchema
      .findOneAndUpdate(
        { email: email },
        { loginStatus: true }
      )
      .then(async function(data) {
        bcrypt.compare(password, data.password, function (err, result) {
          if (err) {
            res.json({ err: err.message });
          }
        let  payload ={uuid:data.uuid, role:data.role}
          if (result) {
            const token = jwt.sign(payload, process.env.JWTKEY);
                        employeeSchema
              .findOne({ email: email })
              .populate("attendance")
              .exec((err, user) => {
                console.log('username',user.empName)
                // console.log('req.params._id', email)
                if (err) {
                  res.json({ err: err.message });
                } else {
                  req.body.entryTime = moment().format("DD/MM/YYYY, hh:mm a")
                  req.body.date= moment().format("DD/MM/YYYY")
                  
                  req.body.month=moment().format("MM");
              
                  // console.log(" req.body.date", req.body.date)
                  attendanceSchema.create(req.body,async (err, newAttendance) => {
                    // console.log('newAttendance', newAttendance)
                    if (err) {
                       res
                        .status(200)
                        .json({ status: "failed", message: err.message });
                    } else {
                      newAttendance.employee.id = user._id
                      newAttendance.employee.empName = user.empName
                    let  attendancedata = await newAttendance.save()
                      
                      user.attendance.push(newAttendance);
                      user.save()
                      return res
                      .status(200)
                      .json({
                        status: "success",
                        message: "successfully login!",
                        token, data ,attendancedata:attendancedata
                      });
                    }
                  });
                }
              });
        
          } else {
            return res.json({
              status: "failure",
              message: "invalide password",
            });
          }
        });
      })
      .catch((err) => {
        return res.json({ status: "failure", message: "invalide mail id" });
      });
  } catch (err) {
    return res.json({ err: err.message });
  }
});

router.post("/logout", async (req, res) => {
  try {
    let id = req.query.id;
    let email = req.query.email;
    console.log(req.query)
    const currentTime = moment().format("DD/MM/YYYY,hh:mm a");
   let test = await attendanceSchema
    .find({ _id: id }).exec()
    console.log('test',test)
    attendanceSchema
      .findOne({ _id: id })
      .then(async function(data)  {
        console.log("data", data);
        console.log("entry",data.entryTime)
        const loginTime = moment(data.entryTime, "DD/MM/YYYY,hh:mm a");
        const current = moment(currentTime, "DD/MM/YYYY,hh:mm a");
        const duration = moment.duration(current.diff(loginTime));
        const hours = parseInt(duration.asHours());
        const minutes = parseInt(duration.asMinutes()) % 60;
        const days = parseInt(duration.asDays());
        console.log(
          hours + " hours and " + minutes + " minutes " + days + " days"
        );
        console.log('current',current)
        // console.log('duration',duration)
        console.log('login',loginTime)
        console.log('email',email)
        
        attendanceSchema
          .findOneAndUpdate(
            { _id: id },
            {
              durationHours:
                hours , 
                durationMinutes: minutes 
            },
            { new: true }
          )
          .then((data) => {
            return res.status(200).json({
              status: "success",
              message: "successfully logout!",
              duration:
                hours + " hours and " + minutes + " minutes ", data: data
            });
          });
          await employeeSchema.findOneAndUpdate({ email: email }, { loginStatus: false }, {new:true}).exec()

      })
      .catch((err) => {
        return res
          .status(404)
          .json({ status: "failure", message: err.message });
      });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});
router.post("/contact", (req, res) => {

  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message; 
  const mailData = {
    from: name,
    to: "sabana.platosys@gmail.com",
    subject: "Contact Form Submission",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Message: ${message}</p>`,
  };
 
  console.log("sending mail")
  
let sendingMail = sendMail.sendMail(mailData, (error) => {
 
  if (!sendingMail) {
    console.log("mail not sending");
  } else {
    alert("Message sent")
  }
  });  
});
module.exports = router;
