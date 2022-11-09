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
        let empID = req.body.empID
        console.log('empid',empID)
        let salary;
        let bankAccountNumber;
        let month;
        await employeeSchema.findOne({ empID: empID }).then(data => {
            console.log('data',data)
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
                    'employee.id':req.query.id,
                    createdAt: { $gte: start, $lte: end }
                }).then(async function (attendance) {
                   console.log('att',attendance)
                    const unique = []; //created empty array for stroing removed duplicate values
                    attendance.map(x => unique.filter(a => a.date == x.date).length > 0 ? null : unique.push(x)); //remove duplicate date
                    let monthTotelLeave = - unique.length + 30
                    leaveAmount = deduction.leave * monthTotelLeave
                  
                    totalpayment = - deduction.total + salary - leaveAmount
                   
                    // empId = req.body.empId
                    req.body.amount = totalpayment
                    req.body.month = month
                    req.body.empId=empID
                    console.log('empId',empID)
                    //transaction
               let transaction=await  transactionSchema.find({ month: req.body.month, empId: empID }).exec()
         
              if(transaction.length !== 0){
                
                if (!transaction === month && !transaction === empID) {
                    let user = new transactionSchema(req.body);
                     let result = await user.save()
                     return res.status(200).json({ status: true, 'message': result })
                 } else {
                     return res.status(200).json({ status: false, 'message': 'already paid' })

                 }

              }else{
                let user = new transactionSchema(req.body);
                let result = await user.save()
                return res.status(200).json({ status: true, 'message': result })

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
router.get('/get-payrecord',async(req,res)=>{
  try{
let payrecord =await transactionSchema.find().exec();
console.log(payrecord)
if(payrecord.length  > 0){
  return res.status(200).json({ status: true, message: 'data fetched successfully',result:payrecord })

}else{
  return res.status(400).json({ status: true, message: "no record found" })

}
  }catch (error) {
        return res.status(400).json({ status: false, 'message': error.message })
  }
})
router.get("/search-emp-id/:key", async (req, res) => {
    console.log(JSON.stringify(req.query.key))
    try {
        let data = await transactionSchema.find({
            "$or": [
                { empId: { $regex: req.query.key, $options: "i" } }
            ]
        })
        if (data.length > 0) {

            return res.status(200).json({ 'status': 'success', message: "data details fetched successfully", 'result': data });
        } else {
            return res.status(404).json({ 'status': 'failure', message: "No data found" })
        }
    } catch (error) {
        return res.status(200).json({ "status": "failure", "message": error.message })
    }
})
module.exports = router

