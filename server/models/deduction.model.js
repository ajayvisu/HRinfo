const mongoose = require('mongoose');
const crypto = require("crypto");
const deductionSchema = new mongoose.Schema({
    deductionID: { type: String, require: false },
    tax: { type: Number, require: false },
    leave: { type: Number, require: false }, //per day deduction
    PF: { type: Number, require: false },
},
    { timestamps: true });
deductionSchema.pre("save", function (next) {
    this.deductionID = "DED" + crypto.pseudoRandomBytes(4).toString("hex").toUpperCase();
    console.log("uuid", this.empId);
    next();
});

<<<<<<< HEAD
module.exports = mongoose.model("deduction", deductionSchema);
=======
deductionSchema.pre("save", function (next) {
    this.deductionID = "DED" + crypto.pseudoRandomBytes(4).toString("hex").toUpperCase();
    console.log("uuid", this.empId);
    next();
});

const deduction = mongoose.model('deduction',deductionSchema);
module.exports = deduction;
>>>>>>> 080a12d40fa1522f400ba49bd4a44331d58b90c3
