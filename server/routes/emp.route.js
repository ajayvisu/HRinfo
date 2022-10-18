const router = require("express").Router();
const employeeSchema = require("../models/emp.modle");
const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
        .findOne({ mobiler: mobile })
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

    console.log('time',time)

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
                token,
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
        console.log("data",data)
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
            { new: true }
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

const time = moment().format("DD/MM/YYYY,hh:mm a")
console.log('time',time)
console.log('hr',time)
console.log('minit',time)

module.exports = router;
