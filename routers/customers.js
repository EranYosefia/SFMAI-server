const express = require("express");
const customersBL = require("../models/customersBL");

const router = express.Router();

router.get("/getCustomers", async (req, res) => {
  const customers = await customersBL.getCustomers();
  return res.json(customers);
});

router.post("/addNewCustomer", async (req, res) => {
  const user = req.body;
  console.log(user);
  try {
    const newCustomer = await customersBL.createCustomer(user);
    res.status(201).json({ msg: "New Customer created" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

module.exports = router;
