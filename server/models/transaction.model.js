var mongoose = require("mongoose");

var transactionSchema = mongoose.Schema(
  {                                       
    transactionID: {type: String, required: false},
    EmpId: { type: String, required: false },
    amount: { type: Number, require: false }, 
    month: { type: String, required: false },
  },
  { timestamps: true }
);

transactionSchema.pre("save", function (next) {
    this.empID = "TRA" + crypto.pseudoRandomBytes(4).toString("hex").toUpperCase();
    console.log("uuid", this.empId);
    next();
  });

module.exports = mongoose.model("transaction", transactionSchema);