const express = require("express");
const app = express();
const mongoose = require ("mongoose");
require('dotenv').config();
const database = require ('./database/db')


PORT = process.env.PORT;

app.listen(PORT, () =>{
    console.log("Server created")
})
