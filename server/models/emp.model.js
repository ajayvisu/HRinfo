const mongoose = require("mongoose");
const crypto = require("crypto");

const employeeSchema = mongoose.Schema(
  {
    empID: { type: String, require: false },
    empName: { type: String, require: true },
    email: { type: String, require: true },
    mobile: { type: String, require: true },
    gender: { type: String, require: true },
    DOB :{type:Date,require:false},
    DOJ : {type:Date,require:false},
    domain:{type: String, require: true},
    image : {type:String,require:false},
    role: { type: String, require: true },
    password: { type: String, require: true },
    baseSalary : {type:Number,require:true},
    Address : {type:String,require:false},
    active: { type: Boolean, require: false, default: false },
    loginStatus: { type: Boolean, require: false, default: false },
    deductionId:{ type: String, required : false },
    leaves: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "leave"
      }],
    attendance: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "attendance"
      }],
    education:[{
      Degree: { type: String, },
      Specialization: { type: String, },
      institue: { type: String, },
      passingYear: { type: String, },
      startDate: { type: Date, },
      endDate: { type: Date, },
    }],
    experience: [{
      organization: { type: String, },
      designation: { type: String, },
     TotelExperience:{type:String}
    }],
      bankDetails:[{
        bankName:{type:String},
        recipientName:{type:String},
        accountNumber:{type:Number},
        ifsc:{type:String}
      }]
  }
);




employeeSchema.pre("save", function (next) {
  this.empID = "EMP" + crypto.pseudoRandomBytes(4).toString("hex").toUpperCase();
  next();
});


module.exports = mongoose.model("emp", employeeSchema);