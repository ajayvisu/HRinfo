const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:'peakyblinders1tommy@gmail.com',
        pass:'tommy12345s'
    }
})





async function mailsend(mailDetails){
try {

    const mailData = {
        from : mailDetails.from,
        to : mailDetails.to,
        subject : mailDetails.subject,
        text   : mailDetails.text   
    }
    
    transport.sendMail(mailData,(err,data)=>{
        if(err){
            console.log('err',err.message);
        }
        if(data){
            console.log('mail sucessfully sending!')
        }else{
            console.log('mail not sending!')
        }
    })

} catch (error) {
    console.log("err",error)
}
}


module.exports = {mailsend}