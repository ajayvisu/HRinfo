const mongoose = require("mongoose");
const crypto = require("crypto");

const employeeSchema =  mongoose.Schema(
  {
    empID: { type: String, require: false },
    empName: { type: String, require: true },
    email: { type: String, require: true },
    mobile: { type: Number, require: true },
    gender: { type: String, require: true },
    role: { type: String, require: true },
    password: { type: String, require: true },
    active: { type: Boolean, require: false, default: false },
    entryTime: { type: String, require: false },
    loginStatus: { type: Boolean, require: false, default: true },
    wokingHour: { type: String, require: false },
    leaves  : [
      {type:mongoose.Schema.Types.ObjectId,
      ref :"leave" }
    ],
    education:[{
      Degree: {type: String,},
      Specialization: {type: String,},
      institue: {type: String,},
      passingYear: {type: String,},
      startDate: {type: String,},
      endDate: {type: String,},
  }],
    experience:[{
      organization:{type: String,},
      designation:{type: String,},
      startDate:{type: String,},
      endDate:{type: String,},
  }],
    bankDetails:[{
      bankName:{type: String},
      recipientName:{type: String},
      accountNumber:{type: Number},
      ifsc:{type: Number},
  }]
  }
);

employeeSchema.pre("save", function (next) {
  this.empID = "EMP" + crypto.pseudoRandomBytes(4).toString("hex").toUpperCase();
  console.log("uuid", this.empId);
  next();
});

module.exports = mongoose.model("emp", employeeSchema);
