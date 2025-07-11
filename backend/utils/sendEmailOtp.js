const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendEmailOtp(to, otp) {
  return transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}`,
  });
}

module.exports = sendEmailOtp;
