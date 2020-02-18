// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
let sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
let msg = {
  to: 'dfjknight@gmail.com',
  from: 'dfjknight55@gmail.com',
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);