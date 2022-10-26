const router = require("express").Router();
const employeeSchema = require("../models/emp.model");
const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const leaveSchema = require("../models/leave.model")
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
        return res
          .status(400)
          .json({
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
      let phone = await employeeSchema
        .findOne({ mobile: mobile })
        .exec();
      if (phone) {
        return res
          .status(400)
          .json({
            status: "failed",
            message: "employee mobile number already exist!",
          });
      }
    } else {
      return res
        .status(404)
        .json({
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
        return res
          .status(201)
          .json({
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
    const empid = req.body.empid
    const password = req.body.password
    const time = moment().format("DD/MM/YYYY, hh:mm a")

    console.log('time', time)

    employeeSchema
      .findOneAndUpdate(
        { $or: [{ uuid: empid }, { email: empid }] },
        { entryTime: time, loginStatus: true }
      )
      .then((data) => {
        bcrypt.compare(password, data.password, function (err, result) {
          if (err) {
            return res.status(401).json({ err: err.message });
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
                token,data
              });
          } else {
            return res
              .status(401)
              .json({ status: "failure", message: "password doesn't mached!" });
          }
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

router.post("/logout", async (req, res) => {
  try {
    const empid = req.body.empid;
    const currentTime = moment().format("DD/MM/YYYY,hh:mm a")
    employeeSchema
      .findOne({ $or: [{ uuid: empid }, { email: empid }] })
      .then((data) => {
        console.log("data", data)
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
            { $or: [{ uuid: empid }, { email: empid }] },
            {
              loginStatus: false,
              wokingHour:
                hours + " hours and " + minutes + " minutes " + days + " days",
            },
            { new: false }
          )
          .then(() => {
            return res
              .status(200)
              .json({
                status: "success",
                message: "successfully logout!",
                workingHour:
                  hours +
                  " hours and " +
                  minutes +
                  " minutes " +
                  days +
                  " days",
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
  let id = req.query.id
  employeeSchema.findOne({ _id: id }).populate('leaves')
    .exec((err, employee) => {
      // console.log('user', employee)
      console.log('req.params._id', id)
      if (err) {
        res.json({ err: err.message })
      } else {
        let startDate = moment(req.body.from).format("MM/DD/YYYY")
        let endDate = moment(req.body.to).format("MM/DD/YYYY")
        let sDate = moment(req.body.from).format('DD') //get leave start date only
        let eDate = moment(req.body.to).format('DD') //get leave endday date only
        let subject=req.body.subject
        console.log('subject',subject)
        req.body.days = eDate - sDate + 1;
        let todayDate = moment().format('DD')
        console.log('todayDate', todayDate)
        console.log('startDate', startDate)
        console.log('endDate', endDate)
        let from = employee.email;
        const mailData = {
          from: 'snowbellplanet@gmail.com',
          to: employee.email,
          subject: "Leave Permission",
          text: `Leave start ${startDate} to ${endDate}`
        }
        console.log('todayDate', todayDate)
        console.log('sDate', sDate)
        if (todayDate < sDate) {

          let sendingMail = sendMail.sendMail(mailData)
          if (!sendingMail) {
            console.log('mail not sending')
          } else {
            leaveSchema.create(req.body, (err, newLeave) => {
              if (err) {
                return res.status(200).json({ status: 'failed', message: err.message })
              } else {
                newLeave.employee.id = employee._id
                newLeave.employee.empName = employee.empName
                // console.log("newleavenewleave", newLeave);
                newLeave.save()
                employee.leaves.push(newLeave)
                employee.save().then(result => {
                  res.status(200).json({ status: 'success', result: result })
                })
              }
            });
          }
        }
        else {
          res.json({ status: 'success', message: 'ghv' })
        }
      }
    });
});
router.get('/findone', async (req, res) => {
  try {

    const data = await employeeSchema.findOne({ email: req.body.email }).exec();
    if (data) {
      return res.json({ status: "success", "result": data })
    } else {
      return res.json({ status: "failure", message: "user not exist" })
    }
  } catch (err) {
    return res.json({ 'err': err.message })
  }
})
router.get('/myleavedetails',async(req,res)=>{
  try{
   let myleave=await employeeSchema.findOne({_id:req.query.id})
   .populate('leaves')
   .exec((err,data)=>{
    console.log('data',data)
    return res.status(200).json({ status:'success', message:'data fetched successfully',result :data.leaves})
   })
  }catch(err){
    return res.json({ 'err': err.message })
  }
})
const time = moment().format("DD/MM/YYYY")
console.log('time', time)
console.log('hr', time)
console.log('minit', time)

           


   
module.exports = router;
