var nodemailer = require("nodemailer");
//-----------------------------------------------------------------------------
export async function sendMail(subject, toEmail, otpText) {
  var transporter = nodemailer.createTransport({
    service:'gmail',
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    secureConnection:false,
    auth: {
      user: "admin@axisvnit.in",
      pass: "pjcxxvafqesqthjw",
    },
    tls:{
        rejectUnauthorized:false,
    }
    
  });

  var mailOptions = {
  
    from: "admin@axisvnit.in",
    to:toEmail,
    subject:subject,
    html: otpText,
  
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

