const router = require("express").Router();
const employeeSchema = require("../models/emp.model");
const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const leaveSchema = require("../models/leave.model");
const sendMail = require("../middleware/mail");
const e = require("express");
require("dotenv").config();

router.post("/addEmployee", async (req, res) => {
  try {
    let empName = req.body.empName;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let gender = req.body.gender;
    let role = req.body.role;
    let password = req.body.password;
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

    const employeeData = await employeeSchema(req.body);
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
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    let email = req.body.email;
    let password = req.body.password;
    const time = moment().format("DD/MM/YYYY, hh:mm a");
    await employeeSchema
      .findOneAndUpdate(
        { email: email },
        { entryTime: time, loginStatus: true }
      )
      .then((data) => {
        bcrypt.compare(password, data.password, function (err, result) {
          if (err) {
            res.json({ err: err.message });
          }
          if (result) {
            const token = jwt.sign({ data }, process.env.JWTKEY, {
              expiresIn: "1h",
            });
            console.log("token", token);
            return res
              .status(200)
              .json({
                status: "success",
                message: "successfully login!",
                token, data
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
    const empid = req.body.empid;
    const currentTime = moment().format("DD/MM/YYYY,hh:mm a");
    employeeSchema
      .findOne({ $or: [{ uuid: empid }, { email: empid }] })
      .then((data) => {
        console.log("data", data);
        const loginTime = moment(data.entryTime, "DD/MM/YYYY,hh:mm a");
        const current = moment(currentTime, "DD/MM/YYYY,hh:mm a");
        const duration = moment.duration(current.diff(loginTime));
        const hours = parseInt(duration.asHours());
        const minutes = parseInt(duration.asMinutes()) % 60;
        const days = parseInt(duration.asDays());
        console.log(
          hours + " hours and " + minutes + " minutes " + days + " days"
        );
        console.log("vist", data.entryTime);

        employeeSchema
          .findOneAndUpdate(
            { email: empid },
            {
              loginStatus: false,
              wokingHour:
                hours + " hours and " + minutes + " minutes " + days + " days",
            },
            { new: true }
          )
          .then(() => {
            return res.status(200).json({
              status: "success",
              message: "successfully logout!",
              workingHour:
                hours + " hours and " + minutes + " minutes " + days + " days",
            });
          });
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

router.post("/emp-leave", (req, res) => {
  let id = req.query.id;
  employeeSchema
    .findOne({ _id: id })
    .populate("leaves")
    .exec((err, employee) => {
      console.log('user', employee)
      console.log('req.params._id', id)
      if (err) {
        res.json({ err: err.message });
      } else {
        let startDate = moment(req.body.from).format("DD/MM/YYYY");
        let endDate = moment(req.body.to).format("DD/MM/YYYY");
        let sDate = moment(req.body.from).format("DD"); //get leave start date only
        let eDate = moment(req.body.to).format("DD"); //get leave endday date only
        req.body.days = eDate - sDate + 1;
        let todayDate = moment().format("DD");
        console.log("todayDate", todayDate);
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
              if (err) {
                return res
                  .status(200)
                  .json({ status: "failed", message: err.message });
              } else {
                newLeave.employee.id = employee._id;
                newLeave.employee.empName = employee.empName;
                // console.log("newleavenewleave", newLeave);
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
router.get("/findone", async (req, res) => {
  try {
    const data = await employeeSchema.findOne({ empID: req.body.empId }).exec();
    if (data) {
      return res.json({ status: "success", result: data });
    } else {
      return res.json({ status: "failure", message: "user not exist" });
    }
  } catch (err) {
    return res.json({ err: err.message });
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

    const Employees = await employeeSchema.find().exec();

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
    console.log(error.message);
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
    const uuid = req.query.uuid;

    await employeeSchema.findOneAndUpdate({ uuid: uuid }, req.body, { new: true }).then(result => {
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

module.exports = router;
