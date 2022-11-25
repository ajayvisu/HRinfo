const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const database = require("./database/db");
const employee = require("./routes/emp.route");
const img_upload = require('./middleware/image_upload');
const attendance = require("./routes/attendance.route")
const transaction = require('./routes/transaction.route')
const leave = require('./routes/leave.route')
const taskSchema=require('./routes/task.route')
const cors = require("cors");
const { Server } = require('http');
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use('/img',img_upload);
app.use('/uploads', express.static('uploads'));
app.use("/api/v1/emp", employee);
app.use('/api/v2/leave',leave)
app.use("/api/v3/attendance", attendance);
app.use('/api/v4/transaction',transaction)
app.use('/api/v5/task',taskSchema)

app.use(express.static('uploads'))
app.get("/", (req, res) => {
  res.send({ status: "sucuss", message: "its working" });
});

app.listen(PORT, () => {
  console.log(`Server created ${PORT}`);
});
