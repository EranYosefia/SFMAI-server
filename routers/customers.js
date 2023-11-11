const express = require("express");
const customersBL = require("../models/customersBL");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/getCustomers", auth, async (req, res) => {
  console.log(req.account.business_number)
  const customers = await customersBL.getCustomers(req.account.business_number);
  return res.json(customers);
});

router.post("/addNewCustomer", auth, async (req, res) => {
  const user = req.body;
  console.log(user);
  try {
    const newCustomer = await customersBL.createCustomer(user);
    res.status(201).json({ msg: "New Customer created" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

// router.delete("/removeCustomer", auth, async (req, res) => {

// })

module.exports = router;
