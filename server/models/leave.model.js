var mongoose = require("mongoose");
var leaveSchema =  mongoose.Schema(
  {
    leaveID:{type:String,required:false},
    subject: { type: String, required: true },
    from: {type:String,required:true},
    to:{type:String,required:true},
    days : {type:Number,required:false},
    AllLeaveDates:[{type:String,required:false}],
    status: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending"
    },
    employee: {
      id: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "emp"
      },
      empName: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("leave", leaveSchema);