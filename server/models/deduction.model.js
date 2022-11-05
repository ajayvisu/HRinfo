const mongoose = require('mongoose');

const deductionSchema = new mongoose.Schema({
    deductionID : {type:Number,require:false},
    tax : {type:Number,require:false},
    leave : {type:Number,require:false}, //per day deduction
    PF : {type:Number,require:false},
});

deductionSchema.pre("save", function (next) {
    this.deductionID = "DED" + crypto.pseudoRandomBytes(4).toString("hex").toUpperCase();
    console.log("uuid", this.empId);
    next();
});

const deduction = mongoose.model('deduction',deductionSchema);
module.exports = deduction;