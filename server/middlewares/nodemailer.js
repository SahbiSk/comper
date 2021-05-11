const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ghassenbriki23@gmail.com",
    pass: "test123456789!",
  },
});

module.exports = { transporter };
