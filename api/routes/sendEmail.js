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
        address: req.body.address
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
        <div
        style="background:url(https://s3.ap-south-1.amazonaws.com/www.manjeet-weds-khushi.com/images/img_bg_1.jpg);background-size: cover;background-position: center;padding: 50px;
        background-repeat:no-repeat;        ">
        <div style="
        font-size: 30px;
        font-weight: 600;
        color: white;
        font-family: cursive;
        position: absolute;
        top: 5%;
        width: 100%;
        text-align: center;
    ">${userDetail.emailSubject}</div>
        <div style="
        font-size: 30px;
        font-weight: 600;
        color: white;
        font-family: cursive;
        position: absolute;
        bottom: 40%;
        width: 100%;
        text-align: center;
        padding-top: 50px;
    ">${userDetail.weddingDate} ${userDetail.address}</div>
</div>

        `
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