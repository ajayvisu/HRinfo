const router = require("express").Router();
const employeeSchema = require("../models/emp.model");
const moment = require("moment");
const leaveSchema = require("../models/leave.model");

const attendanceSchema = require('../models/attendance.model')

router.get('/today-attendance-list',async(req,res)=>{
    try{
        req.body.date=moment().format("DD/MM/YYYY")
   let data= await attendanceSchema.find({date:req.body.date ,"employee.role":'user'}).exec();
   return res.status(200).json({data:data });
    }catch(error){
    return res.status(500).json({ err: err.message });
    }
})
router.get('/my-attendance-list',async(req,res)=>{
  try{
    let data= await attendanceSchema.find({'employee.id':req.query.id}).exec();
    if(data.length >0){
      return res.status(200).json({data:data });
    }else{
    return res.status(200).json({message:"There is no attendance record found" });
    }
  }catch(error){
    return res.status(500).json({ err: err.message });
  }
})
router.get('/get-last-30days-record',async(req,res)=>{
    try{
      id=req.query.id
      console.log("id",id)
      const end = req.body.end
      const start =  req.body.start
       let onMonthLeaveDetails = await attendanceSchema.find({'employee.id':req.query.id,
        createdAt: { $gte: start, $lte: end }
}).populate("emp").exec()
const unique = []; //created empty array for stroing removed duplicate values
onMonthLeaveDetails.map(x =>unique.filter(a=>a.date == x.date).length > 0 ? null :unique.push(x)); //remove duplicate date
//  let data= onMonthLeaveDetails.filter((tag, index, array) => array.findIndex(t => t.date == tag.date) == index);/
let monthTotelLeave = - unique.length + 30
console.log("monthTotelLeave",monthTotelLeave)
    console.log('end',end)
    console.log('start',start)
   
    return res.status(200).json({monthTotelLeaveCount: monthTotelLeave ,onMonthLeaveDetails: onMonthLeaveDetails});
    }catch(error){
      return res.status(500).json({ err: error.message });
    }
  })
 
module.exports = router; 