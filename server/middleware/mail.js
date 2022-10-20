const nodemailer = require('nodemailer');

// const transport = nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//         user:'snowbellplanet@gmail.com',
//         pass:'fuxgibhnudirssms'
//     }
// })
// async function mailsend(mailDetails){
// try {
//     const mailData = {
//         from : "sajna.platosys@gmail.com",
//         to : mailDetails.to,
//         subject : mailDetails.subject,
//         text   : mailDetails.text   
//     }
//     transport.sendMail(mailData,(err,data)=>{
//         if(err){
//             console.log('err',err.message);
//         }
//         if(data){
//             console.log('mail sucessfully sending!')
//         }else{
//             console.log('mail not sending!')
//         }
//     })
// } catch (error) {
//     console.log("err",error)
// }
// }
async function sendMail(mailData) {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false, 
      auth: {
        user: 'snowbellplanet@gmail.com',
        // pass: 'Snowbell@2022', 
        pass:"fuxgibhnudirssms",
      },
    });
   // const data = await ejs.renderFile(join(__dirname,'../templates/', mailData.fileName), mailData, mailData.details)
  
    let mailDetails = await transporter.sendMail({
      from: mailData.from, 
      to: mailData.to, 
      subject: mailData.subject, 
      text: mailData.text, 
      
  
    });
  
    console.log("Message sent:", mailDetails.messageId);
  
  }
module.exports = {sendMail}