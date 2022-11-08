const router = require("express").Router();
const employeeSchema = require("../models/emp.model");
const transactionSchema = require("../models/Transaction.model")
const leaveSchema = require("../models/leave.model")
const moment = require("moment");
const attendanceSchema = require('../models/attendance.model')
const deductionSchema = require('../models/deduction.model')
const { isAdmin } = require('../middleware/auth')



module.exports = router