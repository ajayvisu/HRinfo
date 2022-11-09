var mongoose = require("mongoose");
var attendanceSchema = mongoose.Schema(
  {
    attendanceID: { type: String, required: false },
    date: { type: String, required: false },
    entryTime: { type: String, require: false },
    month:{type: String, require: false},
    durationHours: { type: Number, required: false },
    durationMinutes: { type: Number, require: false },
    employee: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "emp"
      },
      empName: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("attendance", attendanceSchema);