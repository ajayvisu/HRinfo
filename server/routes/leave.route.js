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
        
let todayLeave = await employeeSchema.find({loginStatus:false}).exec()
return res.status(200).json({ status: true, 'message':"data fetched successfully", result:todayLeave })     


}catch(error){
        return res.status(400).json({ status: false, 'message': error.message })     

    }
})
router.post("/emp-leave", (req, res) => {
  let id = req.query.id;
  employeeSchema
    .findOne({ _id: id })
    .populate("leaves")
    .exec((err, employee) => {
      // console.log('user', employee)
      // console.log('req.params._id', id)
      if (err) {
        res.json({ err: err.message });
      } else {
        const startDate = moment(req.body.from).format("DD/MM/YYYY");
        // console.log('startDate', typeof(startDate))
        const endDate = moment(req.body.to).format("DD/MM/YYYY");
        let sDate = moment(req.body.from).format("DD"); //get leave start date only
        let eDate = moment(req.body.to).format("DD"); //get leave endday date only
        req.body.days = eDate - sDate + 1;
        let todayDate = moment().format("DD");
        // console.log("todayDate", todayDate);
        let from = employee.email;

        // const mailData = {
        //   from: employee.email,
        //   to: "sajna.platosys@gmail.com",
        //   subject: "Leave Permission",
        //   text: `Leave start ${startDate} to ${endDate}`,
        // };
        function getDatesInRange(startDate, endDate) {
          const start = moment(startDate).format("DD/MM/YYYY")
          const end = moment(endDate).format("DD/MM/YYYY")

          
      //  const date = new Date(start.getTime());
   
      console.log('date',start)
      
          const dates = [];
      
       while (start <= end) {
        dates.push(new Date(start));
        start.setDate(start.getDate() + 1);
       }
      
       return dates;
      }

const res1 = getDatesInRange(startDate, endDate);


console.log('res1', res1)
console.log('start', startDate,"+",endDate)

        if (todayDate < sDate) {
          // let sendingMail = sendMail.sendMail(mailData);
          // if (!sendingMail) {
          //   console.log("mail not sending");
          // } else {
            leaveSchema.create(req.body, (err, newLeave) => {
              console.log("newleavenewleave", newLeave);
              if (err) {
                return res
                  .status(200)
                  .json({ status: "failed", message: err.message });
              } else {
                newLeave.employee.id = employee._id;
                newLeave.employee.empName = employee.empName;
              
                newLeave.save();
                employee.leaves.push(newLeave);
                employee.save().then((result) => {
                  res.status(200).json({ status: "success", result: result });
                });
              }
            });
          // }
        } else {
          res.json({ status: "success", message: "ghv" });
        }
      }
    });
});
module.exports = router