/**
 * Computer user xd
 * Created by 张洋 on 2017/3/31.
 */
var nodemailer = require('nodemailer');
var mailer = {
    // create reusable transporter object using the default SMTP transport
    transporter:nodemailer.createTransport({
        // service: 'smtp.zoho.com.cn',
        prot:465,
        host:'smtp.zoho.com.cn',
        auth: {
            user: 'z_y_ang@zoho.com.cn',
            pass: '#NodeMail'
        }
    }),
    // setup email data with unicode symbols
    mailOptions:{
        from: '<z_y_ang@zoho.com.cn>', // sender address
        to: 'z_y_ang@163.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world ?', // plain text body
        html: '<b>Hello world ?</b>' // html body
    },
    sendMail:function (text) {
        this.mailOptions.text = text;
        this.mailOptions.html = '<b>'+text+'</b>';
        // send mail with defined transport object
        this.transporter.sendMail(this.mailOptions,function (error, info){
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        })
    }

};
module.exports = mailer;