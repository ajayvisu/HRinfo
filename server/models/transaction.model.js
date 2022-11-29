var mongoose = require("mongoose");
const crypto = require("crypto");
var transactionSchema = mongoose.Schema(
  {                                       
    transactionID: {type: String, required: false},
    empId: { type: String, required: false },
    amount: { type: Number, require: false }, 
    month: { type: String, required: false },
  },
  { timestamps: true }
);

transactionSchema.pre("save", function (next) {
    this.transactionID = "TRA" + crypto.pseudoRandomBytes(4).toString("hex").toUpperCase();
    console.log("uuid", this.empId);
    next();
  });

module.exports = mongoose.model("transactions", transactionSchema);
