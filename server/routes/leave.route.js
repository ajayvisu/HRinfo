const router = require("express").Router();
const employeeSchema = require("../models/emp.model");
const transactionSchema = require("../models/Transaction.model")
const leaveSchema = require("../models/leave.model")
const moment = require("moment");
const attendanceSchema = require('../models/attendance.model')
const deductionSchema = require('../models/deduction.model')
const { isAdmin } = require('../middleware/auth')

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
                let startDate = moment(req.body.from).format("DD/MM/YYYY");
                // console.log('startDate', typeof(startDate))
                let endDate = moment(req.body.to).format("DD/MM/YYYY");
                let sDate = moment(req.body.from).format("DD"); //get leave start date only
                let eDate = moment(req.body.to).format("DD"); //get leave endday date only
                req.body.days = eDate - sDate + 1;
                let todayDate = moment().format("DD");
                //all leave days----------------
                const start = new Date(new Date(req.body.from));
                const end = new Date(new Date(req.body.to));
                const date = new Date(start.getTime());
                req.body.allLeaveDates = [];
                while (date <= end) { (1<=5)
                    req.body.allLeaveDates.push(new Date(date));
                    date.setDate(date.getDate() + 1);
                }
                // console.log('dates', dates)
                //--------------------------
         

                // const mailData = {
                //     from: employee.email,
                //     to: "sajna.platosys@gmail.com",
                //     subject: "Leave Permission",
                //     text: `Leave start ${startDate} to ${endDate}`,
                // };

                if (todayDate <= sDate) {
                    // let sendingMail = sendMail.sendMail(mailData);
                    // if (!sendingMail) {
                    //     console.log("mail not sending");
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
                                newLeave.employee.empID = employee.empID;
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
router.put('/leave-permission-response',async(req,res)=>{
    try{
    let id = req.query.id;
    let status = req.body.status
await leaveSchema.findOneAndUpdate({_id: id}, req.body,{ new: true }).then(data=>{
      res.json({ status: 'success', message: 'Leave Approved successfully!', 'result': data })
        
    }).catch(err => {
        console.log(err.message)
        res.json({ 'err': err.message })
      })
    } catch (error) {
        return res.status(400).json({ status: false, 'message': error.message })
    }
})
//pendingLeave
router.get('/pendingLeave',async(req,res)=>{
    try{
   
await leaveSchema.find({status:'pending'}).then(data=>{
    if(data.length>0){
        res.json({ status: 'success', message: 'Leave Approved successfully!', 'result': data })

    }else{
        res.json({ status: 'success', message: 'Leave Approved successfully!', 'result': 0 })

    }
        
    }).catch(err => {
        console.log(err.message)
        res.json({ 'err': err.message })
      })
    } catch (error) {
        return res.status(400).json({ status: false, 'message': error.message })
    }
})
//performance chart 
router.get('/getDetails', async (req, res) => {
    try {
        var lastWeek = new Date();
        var today = new Date();
        lastWeek.setDate(today.getDate() - 5);

        let attendance = await attendanceSchema.find({
            'employee.id': "6367e81387f67ef6e7708bd7",
            $and: [{ createdAt: { $gte: lastWeek, $lte: today } }]
        })
        return res.status(200).json({ status: true, 'message': "data fetched successfully", result: attendance })
    } catch (error) {
        return res.status(400).json({ status: false, 'message': error.message })
    }
})

//today leave details /admin
router.get('/today-leave', async (req, res) => {
    try {
        let todayDate = new Date()
        let year = todayDate.getFullYear()
        let month = todayDate.getMonth() + 1
        let date = todayDate.getDate()
        let currentDate = year + "-" + month + "-" + date
        let todayLeaveData = await leaveSchema.find({ allLeaveDates: currentDate, status: "approved" }).exec()
        let lengthOfLeave = todayLeaveData.length
        console.log('lengthOfLeave', lengthOfLeave)
        if (todayLeaveData.length > 0) {
            return res.status(200).json({ status: true, 'message': "data fetched successfully", result: todayLeaveData, lengthOfLeave: lengthOfLeave })
        } else {
            return res.status(200).json({ status: true, 'message': "no data found", lengthOfLeave: lengthOfLeave })
        }
    } catch (error) {
        return res.status(400).json({ status: false, 'message': error.message })

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

module.exports = router