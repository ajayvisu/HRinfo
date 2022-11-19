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
router.get('/today-leave',async(req,res)=>{
    try{
  

        let todayDate = new Date()
        let year = todayDate.getFullYear()
        let month = todayDate.getMonth() + 1
        let date= todayDate.getDate()
        let currentDate=year + "-" + month + "-" + date
 let todayLeaveData = await leaveSchema.find({allLeaveDates:currentDate,status:"approved"}).exec()
 let lengthOfLeave =todayLeaveData.length
 console.log('lengthOfLeave',lengthOfLeave)
if(todayLeaveData.length>0){
  return res.status(200).json({ status: true, 'message':"data fetched successfully", result:todayLeaveData ,lengthOfLeave:lengthOfLeave})     
}else{
return res.status(200).json({ status: true, 'message':"no data found" })     
}
}catch(error){
        return res.status(400).json({ status: false, 'message': error.message })     

    }
})

router.post('/leaves',async(req,res)=>{
  try{
const startDate=req.body.from.split("-");
console.log('startf',startDate)

const start = new Date(new Date(req.body.from));
const end = new Date(new Date(req.body.to));
   const date = new Date(start.getTime());
      const dates = [];
   while (date <= end) {
    dates.push(date);
    date.setDate(date.getDate() + 1);
   }
  
   console.log('dates',dates)
 
  
  }catch(error){
        return res.status(400).json({ status: false, 'message': error.message })     

    }
})

// router.get("/test",async(req,res)=>{
//   await employeeSchema.find
// })
module.exports = router