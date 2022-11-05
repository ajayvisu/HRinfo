const router = require("express").Router();
const employeeSchema = require("../models/emp.model");
const transactionSchema = require("../models/Transaction.model")
const leaveSchema = require("../models/leave.model")
const moment = require("moment");
const attendanceSchema = require('../models/attendance.model')
const deductionSchema = require('../models/deduction.model')
const { isAdmin } = require('../middleware/auth')
router.post("/add-deduction", async (req, res) => {
    try {
        let user = new deductionSchema(req.body);
        let result = await user.save();
        return res.status(200).json({
            status: "success",
            message: "deduction details added  successfully",
            result: result
        });
    } catch (error) {
        return res.status(400).json({ status: false, 'message': error.message })
    }
})

router.post("/transaction", isAdmin, async (req, res) => {
    try {
        console.log(req.query)
        let id = req.query.id
        let salary;
        let bankAccountNumber;
        let month;
        await employeeSchema.findOne({ _id: id }).then(data => {
            salary = data.baseSalary
            bankDetails = data.bankDetails
            let accountnumber = bankDetails.map(({ accountNumber }) => accountNumber); // get accountnumber from array of object
            bankAccountNumber = accountnumber[0] //get int value
            deductionId = data.deducationId
            //find deduction details
            deductionSchema.findOne({ deductionID: deductionId }).then(deduction => {

                deduction.total = deduction.tax + deduction.PF


                const end = req.body.end
                const start = req.body.start
                month = moment(req.body.start).format("MM")
                console.log("month", month)
                //get attendance details
                attendanceSchema.find({
                    'employee.id': req.query.id,
                    createdAt: { $gte: start, $lte: end }
                }).then(async function (attendance) {

                    const unique = []; //created empty array for stroing removed duplicate values
                    attendance.map(x => unique.filter(a => a.date == x.date).length > 0 ? null : unique.push(x)); //remove duplicate date
                    let monthTotelLeave = - unique.length + 30
                    leaveAmount = deduction.leave * monthTotelLeave
                    totalpayment = - deduction.total + salary - leaveAmount
                    console.log("totalpayment", totalpayment)
                    console.log('monthTotelLeave', leaveAmount)
                    empId = req.body.empId
                    req.body.amount = totalpayment
                    req.body.month = month
                    //transaction
                    let transaction = await transactionSchema.find({ month: req.body.month, empId: empId }).exec()
                    if (!transaction === month && !transaction === empId) {
                        let user = new transactionSchema(req.body);
                        let result = await user.save()
                        return res.status(200).json({ status: true, 'message': result })
                    } else {
                        return res.status(200).json({ status: true, 'message': 'already paid' })

                    }

                }).catch(error => {
                    return res.status(400).json({ status: false, 'message': error.message })
                })

            }).catch(error => {
                return res.status(400).json({ status: false, 'message': error.message })
            })
        }).catch(error => {
            return res.status(400).json({ status: false, 'message': error.message })
        })


    } catch (error) {
        return res.status(400).json({ status: false, 'message': error.message })
    }
})

module.exports = router