const express = require('express');
const router = express.Router();
var nodemailer = require('nodemailer');



router.post('/', (req, res, next) => {
    const userDetail = {
        name: req.body.name,
        email: req.body.email,
        emailFrom: req.body.emailFrom,
        emailSubject: req.body.emailSubject,
        weddingDate: req.body.weddingDate,
        cardImage: req.body.cardImage
    };
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        // host: 'smtp.gmail.com',
        // port: 465,
        // secureConnection: false,
        // secure: true,
        // ignoreTLS: false,
        // requireTLS: true,
        host: 'smtp.gmail.com',
        auth: {
            user: userDetail.emailFrom,
            pass: '987654321@Rp'
        },
        // tls: {
        //     ciphers: 'SSLv3'
        // }
    });
    var mailOptions = {
        from: userDetail.emailFrom,
        to: userDetail.email,
        subject: userDetail.emailSubject,
        // text: `Hi, Thank you for your response.`,
        html: `<h2><span style="font-size:16px">Hi</sapn> ${userDetail.name.split(" ")[0]}</h2><br>
        <p>
        Please join us in the celebration of our wedding,
         which will happen on ${userDetail.weddingDate}.
          We hope you will grant us with your presence,
           and we would be really happy to see you on our special day.
            All the prayers are welcome!
        </p>
        
        <br>
        <img src=${userDetail.cardImage}/>`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.status(200).json({
        message: `Dear ${userDetail.name.split(" ")[0]}!,
         Thanks for your response. Please check your email`,
        // userDetail: userDetail
    });
});




module.exports = router;