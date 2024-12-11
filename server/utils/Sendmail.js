const nodemailer = require('nodemailer');


const sendMail=(options)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.Email_Name,
            pass: process.env.Email_Password,
        }
    })
    const mailoptions = transporter.sendMail({
        from: `process.env.Email_Name`,
        to: options.to,
        subject: options.subject,
        text: options.text,
    });
}
 module.exports=sendMail
