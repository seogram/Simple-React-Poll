const nodemailer = require('nodemailer');
const config = require('../config/mailer');

const transport = nodemailer.createTransport({
  host: 'mail.seogram.de',
   port: 25,
   secure: false, // secure:true for port 465, secure:false for port 587
   auth: {
       user: 'info@seogram.de',
       pass: '@Hamed1357889'
   }
});

module.exports = {
  sendEmail(from, to, subject, html) {
    return new Promise((resolve, reject) => {
      transport.sendMail({ from, subject, to, html }, (err, info) => {
      if (err) reject(err);

        resolve(info);
      });
    });
  }
}
