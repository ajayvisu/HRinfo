const mongoose = require('mongoose');

const deductionSchema = new mongoose.Schema({
    deductionID : {type:Number,require:false},
    tax : {type:Number,require:false},
    leave : {type:Number,require:false}, //per day deduction
    PF : {type:Number,require:false},
});

const deduction = mongoose.model('deduction',deductionSchema);
module.exports = deduction;