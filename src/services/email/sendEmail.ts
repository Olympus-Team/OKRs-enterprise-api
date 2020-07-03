import * as nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export const sendEmail = async (email: string, password: string): Promise<void> => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'apikey', // generated ethereal user
      pass: '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', // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'phanduc0908@gmail.com', // sender address
    to: email, // list of receivers
    subject: '[Flame-OKRs] Change password', // Subject line
    html: `<h3>Your new password: ${password}</h3>`, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};
