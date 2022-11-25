const router=require('express').Router()
const employeeSchema = require("../models/emp.model");
const transactionSchema = require("../models/Transaction.model")
const leaveSchema = require("../models/leave.model")
const moment = require("moment");
const attendanceSchema = require('../models/attendance.model')
const deductionSchema = require('../models/deduction.model')
const taskSchema=require('../models/task.model')

router.post('/task-asign-to-emp',async(req,res)=>{
    try{
empID=req.body.empID
empName=req.body.empName
console.log(empID,empName)
console.log(req.body)
employeeSchema.findOne({$or:[{empID:empID},{empName:empName}]}).then(async function(data){
    if(data === null){
        console.log('null')
    return res.json({ status:true,message:"employee not found"})

    }else{
        console.log('notnull')
        const task=new taskSchema(req.body)
        console.log(task)
       let result=await task.save()
         return res.json({ status:true,data:result})
    }

  }).catch(error=>{
    return res.json({ 'err': error.message })
  })
    }catch(error){
        return res.json({ 'err': error.message })
    }
})

router.get('/get-my-task',async(req,res)=>{
    try{
taskSchema.find({empID:req.query.empID,$or:[{status:"TASK_PENDING"},{status:"TASK_PROGRESS"}] })
.then(async function(data){
if(data.length>0){
    return res.json({ status:true,data:data})
}else{
    return res.json({ status:false,message:"task not assigned contact to manager",data:0})
}
})
    }catch(error){
        return res.json({ 'err': error.message })
    }
})
router.get('/get-all-task',async(req,res)=>{
    try{
await taskSchema.find().then(async function(data){
    if(data.length>0){
        return res.json({ status:true,data:data})
    }else{
        return res.json({ status:true,message:"task not assigned ",data:0})
    }
})
    }catch(error){
        return res.json({ 'err': error.message })
    }
})
router.put('/emp-update',async(req,res)=>{
    try{

        let id = req.query.id;
    await taskSchema.findOneAndUpdate({_id: id}, req.body,{ new: true }).then(data=>{
          res.json({ status: 'success', message: 'update successfully!', 'result': data })
            
        }).catch(err => {
            console.log(err.message)
            res.json({ 'err': err.message })
          })
    }catch(error){
        return res.json({ 'err': error.message })
    }
})
router.put('/update',async(req,res)=>{
    try{
        let id = req.query.id;
await attendanceSchema.findOne({_id:id}).then(data=>{
    let datas=data.todayAttendance
    let attendanceId= datas.length-1
    console.log(attendanceId)
let update=datas[attendanceId]
 
    durationHours=req.body.durationHours,
    durationMinutes=req.body.durationMinutes
  
    console.log(update)
     attendanceSchema.findOne({"todayAttendance._id": update}).then(data=>{
        data.todayAttendance[attendanceId]
            console.log(  data.todayAttendance[attendanceId].entryTime)
        
    //   data.todayAttendance[attendanceId]["durationHours"] =durationHours
    //   data.save()
          res.json({ status: 'success', message: 'update successfully!', 'result': data })
            
        }).catch(err => {
            console.log(err.message)
            res.json({ 'err': err.message })
          })
})
     
    }catch(error){
        return res.json({ 'err': error.message })
    }
})
module.exports = router;