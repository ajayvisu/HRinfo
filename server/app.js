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
const cors = require("cors");
const { Server } = require('http');
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/emp", employee);
app.use('/img',img_upload);
app.use('/uploads', express.static('uploads'));
app.use('/api/leave',leave)
app.use("/api/attendance", attendance);
app.use('/api/transaction',transaction)
app.use(express.static('uploads'))
app.get("/", (req, res) => {
  res.send({ status: "sucuss", message: "its working" });
});

app.listen(PORT, () => {
  console.log(`Server created ${PORT}`);
});
