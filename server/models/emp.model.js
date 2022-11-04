const mongoose = require("mongoose");
const crypto = require("crypto");

const employeeSchema = mongoose.Schema(
  {
    empID: { type: String, require: false },
    empName: { type: String, require: true },
    email: { type: String, require: true },
    mobile: { type: Number, require: true },
    gender: { type: String, require: true },
    DOB :{type:String,require:false},
    DOJ : {type:Date,require:false},
    image : {type:String,require:false},
    role: { type: String, require: true },
    password: { type: String, require: true },
    baseSalary : {type:Number,require:true},
    Address : {type:String,require:false},
    active: { type: Boolean, require: false, default: false },
    loginStatus: { type: Boolean, require: false, default: true },
    leaves: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "leave"
      }
    ],
    attendance: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "attendance"
      }
    ],
    education: [{
      Degree: { type: String, },
      Specialization: { type: String, },
      institue: { type: String, },
      passingYear: { type: String, },
      startDate: { type: String, },
      endDate: { type: String, },
    }],
    experience: [{
      organization: { type: String, },
      designation: { type: String, },
      startDate: { type: String, },
      endDate: { type: String, },
    }]
  }
);

employeeSchema.pre("save", function (next) {
  this.empID = "EMP" + crypto.pseudoRandomBytes(4).toString("hex").toUpperCase();
  console.log("uuid", this.empId);
  next();
});

module.exports = mongoose.model("emp", employeeSchema);
