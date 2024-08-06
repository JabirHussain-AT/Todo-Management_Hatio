import nodemailer from "nodemailer";

export const sendOtpFun = async (email: string, content: number | string) => {


  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASS,
    },
    secure: true,
  });

  const message = "OTP IS THIS";
  const mailData = {
      from:  process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'OTP FROM TO DO MANAGEMENT  APP',
      html: `<p>${message}</p> <p style="color: tomato; font-size: 25px; letter-spacing: 2px;"><b>${content}</b></p><p>This Code <b>expires in 5 minute(s)</b>.</p>`,
  }

   const result =  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent successfully :", info.response);
     
    }
  });

};