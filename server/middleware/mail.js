const nodemailer = require('nodemailer');

async function sendMail(mailData) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: "safamsg@gmail.com",
            pass: "iglhyqpekuescteh",
        },
    });
    let mailDetails = await transporter.sendMail({
        from: mailData.from,
        to: mailData.to,
        subject: mailData.subject,
        text: mailData.text,
        html:mailData.html


    });

    console.log("Message sent:", mailDetails.messageId);

}
module.exports = { sendMail }