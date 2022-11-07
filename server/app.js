const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const database = require("./database/db");
const employee = require("./routes/emp.route");
const attendance = require("./routes/attendance.route")
const cors = require("cors");
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use("/api/emp", employee);
app.use("/api/attendance", attendance);
app.get("/", (req, res) => {
  res.send({ status: "sucuss", message: "its working" });
});

app.listen(PORT, () => {
  console.log(`Server created ${PORT}`);
});
