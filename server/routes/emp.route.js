const router = require("express").Router();
const employeeSchema = require("../models/emp.model");
const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const leaveSchema = require("../models/leave.model");
const deductionSchema = require("../models/deduction.model")
const sendMail = require("../middleware/mail");
const multer = require('multer');
const e = require("express");
require("dotenv").config();
const attendanceSchema = require('../models/attendance.model');
// const deductionSchema = require('../models/deduction.model');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    return cb(null, Date.now() + '_' + file.originalname)
  }
})

router.put("/updateimage", async (req, res) => {
  try {
    console.log(req.body, req.file, req.query)
    const id = req.query.id;
    const upload = multer({ storage: storage }).single('file')

    upload(req, res, async function (err) {
      if (!req.file) {
        return res.send("Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }
      reqData = {
        image: req.file.filename
      }
      const data = await employeeSchema.findOneAndUpdate({ _id: id }, reqData, { new: true }).exec()
      if (data) {
        return res.status(200).json({ 'status': 'success', "message": " successfully added", "result": data })
      } else {
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
    await user.save().then(async function (deduction) {
      req.body.deducationId = deduction._id
      console.log("deduction", deduction._id)
      console.log("req.body.deducationId", req.body.deducationId)

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

router.put("/imag_update", async (req, res) => {
  try {
    const data = await employeeSchema.findOneAndUpdate({ email: req.query.email }, { image: req.body.image }, { new: true })
      .then(result => {
        res.json({ status: 'succuss', message: 'image successfully added', result });
      }).catch(err => {
        res.json({ status: 'failure', message: err.message, })
      })


  } catch (error) {
    return res.json({ error: error.message });
  }
})




router.get('/getEmployee', async (req, res) => {
  try {
    const Employees = await employeeSchema.find({ role: "user" }).exec();
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



// router.post("/login", async (req, res) => {
//   try {
//     console.log(req.body);
//     // let attendancedata;
//     let email = req.body.email;
//     let password = req.body.password;

//     const time = moment().format("DD/MM/YYYY, hh:mm a");
//     await employeeSchema
//       .findOneAndUpdate(
//         { email: email },
//         { loginStatus: true }
//       )
//       .then(async function (data) {
//         bcrypt.compare(password, data.password, function (err, result) {
//           if (err) {
//             res.json({ err: err.message });
//           }
//           let payload = { uuid: data.uuid, role: data.role }
//           if (result) {
//             const token = jwt.sign(payload, process.env.JWTKEY);
//             employeeSchema
//               .findOne({ email: email })
//               .populate("attendance")
//               .exec((err, user) => {
//                 console.log('username', user.empName)
//                 // console.log('req.params._id', email)
//                 if (err) {
//                   res.json({ err: err.message });
//                 } else {
//                   req.body.entryTime = moment().format("DD/MM/YYYY, hh:mm a")
//                   req.body.date = moment().format("DD/MM/YYYY")

//                   req.body.month = moment().format("MM");

//                   // console.log(" req.body.date", req.body.date)
//                   attendanceSchema.create(req.body, async (err, newAttendance) => {
//                     // console.log('newAttendance', newAttendance)
//                     if (err) {
//                       res
//                         .status(200)
//                         .json({ status: "failed", message: err.message });
//                     } else {
//                       newAttendance.employee.id = user._id
//                       newAttendance.employee.empName = user.empName
//                       newAttendance.employee.role = user.role

//                       let attendancedata = await newAttendance.save()

//                       user.attendance.push(newAttendance);
//                       user.save()
//                       return res
//                         .status(200)
//                         .json({
//                           status: "success",
//                           message: "successfully login!",
//                           token, data, attendancedata: attendancedata
//                         });
//                     }
//                   });
//                 }
//               });

//           } else {
//             return res.json({
//               status: "failure",
//               message: "invalide password",
//             });
//           }
//         });
//       })
//       .catch((err) => {
//         return res.json({ status: "failure", message: "invalide mail id" });
//       });
//   } catch (err) {
//     return res.json({ err: err.message });
//   }
// });

router.post("/logout", async (req, res) => {
  try {
    let id = req.query.id;
    let email = req.query.email;
    let currentAttendanceId;
    console.log(req.query)
    const currentTime = moment().format("DD/MM/YYYY,hh:mm a");
    attendanceSchema
      .findOne({ "employee.id": id })
      .then(async function (data) {
        // console.log("data", data);

        let attendancedata = data.todayAttendance
        let attendanceId = attendancedata.length - 1
        let entryTime = data.todayAttendance[attendanceId].entryTime

        // console.log(attendanceId)
        const loginTime = moment(entryTime, "DD/MM/YYYY,hh:mm a");
        const current = moment(currentTime, "DD/MM/YYYY,hh:mm a");
        const duration = moment.duration(current.diff(loginTime));       
        const hours = parseInt(duration.asHours());
        const minutes = parseInt(duration.asMinutes()) % 60;
        const days = parseInt(duration.asDays());
        // console.log(
        //   hours + " hours and " + minutes + " minutes " + days + " days"
        // );

        let particluarData = attendancedata[attendanceId]
        data.todayAttendance[attendanceId]["durationHours"] = hours
        data.todayAttendance[attendanceId]["durationMinutes"] = minutes
        let workingHours=0;
        let workingMinutes=0;
        data.todayAttendance.map(data=>{
        console.log(data.durationHours)

          workingHours=   workingHours += data.durationHours
          workingMinutes=   workingMinutes += data.durationMinutes
          console.log("workingMinutes",workingMinutes,"workingHours",workingHours)
      

        })
      
        data.totalWorkingHours=workingHours +"."+workingMinutes
        data.save().then(data => {
          return res.status(200).json({
            status: "success",
            message: "successfully logout!",
            duration:
              hours + " hours and " + minutes + " minutes ", data: data
          });
        })
        await employeeSchema.findOneAndUpdate({ email: email }, { loginStatus: false }, { new: true }).exec()
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
router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    // let attendancedata;
    let email = req.body.email;
    let password = req.body.password;
    let attendanceId;
    let currentAttendanceId;
    let attendanceID;
    const currDate = moment().format("DD/MM/YYYY");
    const time = moment().format("DD/MM/YYYY, hh:mm a");
    await employeeSchema
      .findOneAndUpdate(
        { email: email },
        { loginStatus: true }
      )
      .then(async function (data) {
        bcrypt.compare(password, data.password, function (err, result) {
          if (err) {
            res.json({ err: err.message });
          }
          let payload = { uuid: data.uuid, role: data.role }
          if (result) {
            const token = jwt.sign(payload, process.env.JWTKEY);
            employeeSchema
              .findOne({ email: email })
              .populate("attendance")
              .exec((err, user) => {
                console.log('userID', user._id)
                if (err) {
                  res.json({ err: err.message });
                } else {
                  //-------------
     attendanceSchema.find({ date: currDate, "employee.id": user._id }).then(async function (data) {

                    if (data.length > 0) {
                      const attendance = await attendanceSchema.findOne({ date: currDate, "employee.id": user._id }).exec()
                      console.log('att', attendance)


                      req.body.entryTime = moment().format("DD/MM/YYYY, hh:mm a")
                      req.body.date = moment().format("DD/MM/YYYY")
                      req.body.month = moment().format("MM");
                      req.body.day = moment().format("dddd");

                      let todayattendance = {
                        date: req.body.date,
                        day : req.body.day,
                        entryTime: req.body.entryTime,
                        month: req.body.month,
                      
                      }
                      console.log("todayattendance", todayattendance)
                      attendance.todayAttendance.push(todayattendance)
                      let attendanceID = await attendance.save()

                      return res
                        .status(200)
                        .json({
                          status: "success",
                          message: "successfully login!",
                          user, token, currentAttendanceId: attendanceID
                        });
                    } else {
                      req.body.entryTime = moment().format("DD/MM/YYYY, hh:mm a")
                      req.body.date = moment().format("DD/MM/YYYY")
                      req.body.day = moment().format("dddd");
                      req.body.month = moment().format("MM");
                      let todayattendance = {
                        date: req.body.date,
                        day: req.body.day,
                        entryTime: req.body.entryTime,
                        month: req.body.month,
                      }
                      attendanceSchema.create(req.body, async (err, newAttendance) => {
                        if (err) {
                          res
                            .status(200)
                            .json({ status: "failed", message: err.message });
                        } else {
                          newAttendance.employee.id = user._id
                          newAttendance.employee.empName = user.empName
                          newAttendance.employee.role = user.role
                          newAttendance.todayAttendance.push(todayattendance)
                          let attendanceID =await newAttendance.save()

                          user.attendance.push(newAttendance);

                          employeeSchema.findOneAndUpdate({ _id: user._id }, { $push: { "attendance": newAttendance } }).exec()

                          return res
                            .status(200)
                            .json({
                              status: "success",
                              message: "successfully login!",
                              user, token, currentAttendanceId: attendanceID
                            });
                        }
                      });
                    }
                  })
                }
              });
            //--------
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
// router.post("/login", async (req, res) => {
//   try {
//     console.log(req.body);
//     // let attendancedata;
//     let email = req.body.email;
//     let password = req.body.password;
//     let attendanceId;
//     let currentAttendanceId;
//     let attendanceID;
//     const currDate = moment().format("DD/MM/YYYY");
//     const time = moment().format("DD/MM/YYYY, hh:mm a");
//     await employeeSchema
//       .findOneAndUpdate(
//         { email: email },
//         { loginStatus: true }
//       )
//       .then(async function (data) {
//         bcrypt.compare(password, data.password, function (err, result) {
//           if (err) {
//             res.json({ err: err.message });
//           }
//           let payload = { uuid: data.uuid, role: data.role }
//           if (result) {
//             const token = jwt.sign(payload, process.env.JWTKEY);
//             employeeSchema
//               .findOne({ email: email })
//               .populate("attendance")
//               .exec((err, user) => {
//                 console.log('userID', user._id)
//                 if (err) {
//                   res.json({ err: err.message });
//                 } else {
//                   //-------------
//                   attendanceSchema.findOne({ empName: user.empName }).then(async function (data) {
//                     if (data) {
//                       console.log('true')
//                     } else {
//                       req.body.entryTime = moment().format("DD/MM/YYYY, hh:mm a")
//                       req.body.date = moment().format("DD/MM/YYYY")
//                       req.body.month = moment().format("MM");
//                       req.body.empName = user.empName
//                       let todayattendance = {
//                         "date": req.body.date,
//                         "entryTime": req.body.entryTime,
//                         "month": req.body.month,
//                       }
//                      let date =req.body.date
//                       attendanceSchema.create(req.body, async (err, newAttendancedata) => {
//                         console.log("newAttendancedata", newAttendancedata)
//                         if (err) {
//                           res
//                             .status(200)
//                             .json({ status: "failed", message: err.message });
//                         } else {
//                           newAttendancedata.employee.id = user._id
//                           newAttendancedata.employee.empName = user.empName
//                           newAttendancedata.employee.role = user.role
//                           // newAttendancedata.attendance.todayAttendance.push(todayattendance)
//                           newAttendancedata.attendance.push(todayattendance)
//                           for(let i=0;i<newAttendancedata.attendance.length;i++){

//                             if(newAttendancedata.attendance.length-1 === i){
//                               console.log('tru')
//                               newAttendancedata.attendance.todayAttendance.push(todayattendance)

//                             }else{
//                               console.log('falsde')

//                             }
//                           }
//                         let  attendanceid=newAttendancedata.attendance.length-1
//                         console.log(attendanceid)
//                         let x=newAttendancedata.attendance[attendanceid]
                          
      
//                           // newAttendancedata.attendance[attendanceid]._id.push(todayattendance)
//                        let att =await   attendanceSchema.findOne({ "attendance.date": date},).exec()
//                          console.log('att',att)
//                           let attendanceID = newAttendancedata.save()


//                           user.attendance.push(newAttendancedata);

//                           employeeSchema.findOne({ _id: user._id }, { $push: { "attendance": newAttendancedata } })

//                           return res
//                             .status(200)
//                             .json({
//                               status: "success",
//                               message: "successfully login!",
//                               user, token, currentAttendanceId: attendanceID
//                             });
//                         }
//                       })
//                       console.log('false')

//                     }
//                   })
//                 }
//               });
//             //--------
//           } else {
//             return res.json({
//               status: "failure",
//               message: "invalide password",
//             });
//           }
//         });
//       })
//       .catch((err) => {
//         return res.json({ status: "failure", message: "invalide mail id" });
//       });
//   } catch (err) {
//     return res.json({ err: err.message });
//   }
// });
module.exports = router;
