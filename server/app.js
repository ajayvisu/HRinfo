const express = require("express");
const app = express();
const mongoose = require ("mongoose");
require('dotenv').config();
const database = require ('./database/db')



app.listen(PORT, () =>{
    console.log("Server created")
})
