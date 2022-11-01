const router = require("express").Router();
const employeeSchema = require("../models/emp.model");
const moment = require("moment");
const leaveSchema = require("../models/leave.model");

const attendanceSchema = require('../models/attendance.model')

router.get('/getdata',async(req,res)=>{
    try{
        req.body.date=moment().format("DD/MM/YYYY")
   let data= await attendanceSchema.find({date:req.body.date}).exec();
   return res.status(200).json({data:data });
    }catch(error){
    return res.status(500).json({ err: err.message });

    }
})

module.exports = router;