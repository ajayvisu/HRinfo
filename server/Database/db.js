const mongoose = require('mongoose')



mongoose.connect(process.env.DBURL,{
    useNewUrlParser : true, useUnifiedTopology : true
})
.then((data)=>{
    console.log("database connected");
})
.catch((error)=>{
    console.log(error.message);
});

module.exports = mongoose;