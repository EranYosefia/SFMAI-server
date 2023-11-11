const express = require("express");
const accountBL = require("../models/accountBL.js");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const newAccount = await accountBL.handleRegister(req.body);
    res.status(201).json({ message: "New Account created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { business_number, password } = req.body;
    const accessToken = await accountBL.handleLogin(business_number, password);
    console.log(accessToken)
    res.status(200).json({ accessToken: accessToken, message: `logged in successfully` });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

module.exports = router;
