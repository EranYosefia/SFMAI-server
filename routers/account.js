const express = require("express");
const accountBL = require("../models/accountBL.js");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
  const body = req.body;
  try {
    const newAccount = await accountBL.registration(body);
    res.status(201).json({ message: "New Account created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
