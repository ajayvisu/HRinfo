const mongoose= require('mongoose')
const crypto = require("crypto");
const taskSchema = mongoose.Schema({
    tasktitle: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 100,
        required: true,
      },
      // assignto
      empID: {
        type: String,
        required: true,
      },
      empName: {
        type: String,
        required: true,
      },
      describe: {
        type: String,
        trim: true,
        required: true,
      },
      project: {
        type: String,
      },
      status: {
        type: String,
        default: "TASK_PENDING" ,
        enum: ["TASK_DONE", "TASK_PENDING","TASK_PROGRESS"],
      },
}, { timestamps: true })

taskSchema.pre("save", function (next) {
    this.transactionID = "task" + crypto.pseudoRandomBytes(4).toString("hex").toUpperCase();
    console.log("uuid", this.empId);
    next();
  });

module.exports = mongoose.model("taskSchema", taskSchema);
