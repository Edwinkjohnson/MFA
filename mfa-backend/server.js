const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

let otpStore = {};

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "johnsonedwin051@gmail.com",
    pass: "zlqwdckuaddfmkvk", // Gmail App Password
  },
});

// Send OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[email] = otp;

  try {
    await transporter.sendMail({
      from: "MFA Login <johnsonedwin051@gmail.com>",
      to: email,
      subject: "Your Login OTP",
      text: `Your OTP is ${otp}. Valid for 5 minutes.`,
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

// Verify OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] == otp) {
    delete otpStore[email];
    return res.json({ success: true });
  }

  res.status(400).json({ success: false });
});

app.listen(5000, () => {
  console.log("✅ Backend running at http://localhost:5000");
});
app.get("/", (req, res) => {
  res.send("MFA Backend Running");
});

