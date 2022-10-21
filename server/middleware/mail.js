const nodemailer = require('nodemailer');

async function sendMail(mailData) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            user: 'snowbellplanet@gmail.com',
            pass: "fuxgibhnudirssms",
        },
    });
    let mailDetails = await transporter.sendMail({
        from: mailData.from,
        to: mailData.to,
        subject: mailData.subject,
        text: mailData.text,


    });

    console.log("Message sent:", mailDetails.messageId);

}
module.exports = { sendMail }