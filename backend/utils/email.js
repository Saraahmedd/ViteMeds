const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");
//183a88ad461cee6e9e83d592b67dd549
//cd2ffde987f6b1dc6913a839e43f8342
const Mailjet = require("node-mailjet");

const mailjet = Mailjet.apiConnect(
  "183a88ad461cee6e9e83d592b67dd549",
  "cd2ffde987f6b1dc6913a839e43f8342"
);
module.exports = class Email {
  constructor(user, OTP) {
    this.to = user.email;
    this.OTP = OTP;
    this.from = `ELHA2NY <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === "production") {
      // Sendgrid
      return nodemailer.createTransport({
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    //183a88ad461cee6e9e83d592b67dd549

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../email/${template}.pug`, {
      // firstName: this.firstName,
      OTP: this.OTP,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    // 3) Create a transport and send email
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "abdohatom2002@gmail.com",
            Name: "Mailjet Pilot",
          },
          To: [
            {
              Email: this.to,
              Name: "",
            },
          ],
          Subject: "subject",
          TextPart:
            template == "passwordReset"
              ? "Your OTP is: " + this.OTP
              : "This " + this.medicine + " is out of stock",
          // HTMLPart:
          //   '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
        },
      ],
    });
    request.then(() => {
      // console.log(request);
    });
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome to elha2ny!");
  }
  async sendMedOutfStock(medicine) {
    console.log(this.email);
    this.medicine = medicine;

    await this.send("medicineOutOfStock", "Medicine out of stock alert!");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
};
