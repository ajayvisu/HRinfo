var mongoose = require("mongoose");
var leaveSchema = new mongoose.Schema(
  {
    leaveID:{type:String,required:false},
    subject: { type: String, required: true },
    from: {type:Date,required:true},
    to:{type:Date,required:true},
    days : {type:Number,required:false},
  
    status: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending"
    },
   active:{type:Boolean,default:false},
    employee: {
      empID: {
        type:String,
        ref: "emp"
      },
      empName: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("leave", leaveSchema);