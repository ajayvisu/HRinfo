var mongoose = require("mongoose");
const crypto = require("crypto");
var transactionSchema = mongoose.Schema(
  {                                       
    transactionID: {type: String, required: false},
    empId: { type: String, required: true },
    amount: { type: Number, require: true }, 
    month: { type: String, required: true },
  },
  { timestamps: true }
);
transactionSchema.pre("save", function (next) {
    this.transactionID = "TRA" + crypto.pseudoRandomBytes(4).toString("hex").toUpperCase();
    console.log("uuid", this.empId);
    next();
  });

module.exports = mongoose.model("transaction", transactionSchema);

