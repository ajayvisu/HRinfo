const router = require("express").Router();
const employeeSchema = require("../models/emp.model");
const transactionSchema = require("../models/Transaction.model")
const leaveSchema = require("../models/leave.model")
const moment = require("moment");
const attendanceSchema = require('../models/attendance.model')
const deductionSchema = require('../models/deduction.model')
const { isAdmin } = require('../middleware/auth')

router.get('/getDetails',async(req,res)=>{
    try{
        var lastWeek = new Date();
        var today = new Date();
        lastWeek.setDate(today.getDate() - 5);
  
let attendance = await attendanceSchema.find({ 
    'employee.id':"6367e81387f67ef6e7708bd7",
    $and:[{    createdAt: { $gte: lastWeek, $lte: today }}]
})
        return res.status(200).json({ status: true, 'message':"data fetched successfully", result:attendance })     
    }catch(error){
        return res.status(400).json({ status: false, 'message': error.message })     
    }
})

module.exports = router