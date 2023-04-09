const express = require("express");
const router = express.Router();

const {
  emailVerification,
  verifyOtp,
} = require("../controller/authController");

router.post("/verify/email", emailVerification);
router.post("/verify/otp/:otp", verifyOtp);

module.exports = router;
