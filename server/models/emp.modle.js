const mongoose = require("mongoose");
const crypto = require("crypto");

const employeeSchema = new mongoose.Schema(
  {
    empid: { type: String, require: false },
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
  }
);

employeeSchema.pre("save", function (next) {
  this.empid = "EMP" + crypto.pseudoRandomBytes(4).toString("hex").toUpperCase();
  console.log("uuid", this.empid);
  next();
});

module.exports = mongoose.model("emp", employeeSchema);
