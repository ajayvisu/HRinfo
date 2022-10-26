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
    ]
  }
);

employeeSchema.pre("save", function (next) {
  this.empID = "EMP" + crypto.pseudoRandomBytes(4).toString("hex").toUpperCase();
  console.log("uuid", this.empId);
  next();
});

module.exports = mongoose.model("emp", employeeSchema);