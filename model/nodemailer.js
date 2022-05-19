
var nodemailer = require('nodemailer');

function mailer(token,mail){
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EventMail,
    pass: process.env.EventMailPass
  }
});


var mailOptions = {
  from: process.env.EventMail,
  to: `${mail}`,
  subject: 'Eventizer OTP verification',
  html:"<p>Your OTP <h1>"+token+"</h1>.You have only 5 minutes left. After 5 minutes, your token will be expired and you will have to login again.</p>"
};
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
 

module.exports = {mailer};