const Memory = require("../models/memories");
const nodemailer = require("nodemailer");
require("dotenv").config();
const otpGenerator = require("otp-generator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const JWTKEY = process.env.JWTKEY;

const otp = otpGenerator.generate(6, {
  upperCaseAlphabets: false,
  specialChars: false,
  lowerCaseAlphabets: false,
});

exports.emailVerification = async (req, res) => {
  try {
    // let testAccount = await nodemailer.createTestAccount();

    // const etherealName = process.env.ETHEREAL_NAME;
    // const etherealUserName = process.env.ETHEREAL_USER_NAME;
    // const etherealPass = process.env.ETHEREAL_PASS;

    console.log("emailVerification");

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: process.env.ETHEREAL_USER_NAME,
        pass: process.env.ETHEREAL_PASS,
      },
    });

    console.log(
      "🚀 ~ file: authController.js:46 ~ exports.emailVerification= ~ req.body:",
      req.body
    );
    const emailSubject = "Verify email";
    const emailText = `Hello there, ${"\n"}Your otp for the memories app is ${otp}${"\n"}Thank you`;
    const emailHtml = `<br>Hello there,</br>Your otp for the memories app is ${otp}<br>Thank you`;
    const senderId = process.env.SENDER_EMAIL;
    const toId = process.env.RECEIVER_EMAIL;

    let info = await transporter.sendMail({
      from: `"${senderId}" <${senderId}>`,
      to: `${req.body.email},${req.body.email}`,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    });

    console.log("Message sent: ", info.messageId);

    console.log("Preview URL : ", nodemailer.getTestMessageUrl(info));

    res
      .status(200)
      .json({ success: true, message: "EMAIL VERIFICATION WORKS" });
  } catch (error) {
    return res.status(400).json({ success: false, err: error });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    console.log("verifyOtp");
    const userOtp = req.params.otp;

    console.log("req.param", req.params);

    if (userOtp == otp) {
      const user = new User(req.body);
      await user.save();
      const token = jwt.sign({ userId: user._id }, JWTKEY);
      res.status(200).json({ success: true, token, message: "Otp matched" });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Otp did not matched", ejje: "sdf" });
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: authController.js:77 ~ exports.verifyOtp= ~ error:",
      error
    );
    return res.status(400).json({ success: false, err: error });
  }
};
