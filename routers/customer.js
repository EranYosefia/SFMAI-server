const express = require("express");
const customerBL = require("../models/customerBL");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/getCustomers", auth, async (req, res) => {
  const account_id = req.account_id
  const customers = await customerBL.getCustomers(account_id);
  return res.json(customers);
});

router.post("/addNewCustomer", auth, async (req, res) => {
  const customer = req.body;
  customer.account_id = req.account_id

  try {
    const newCustomer = await customerBL.createCustomer(customer);
    res.status(201).json({ message: "New Customer created" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.delete("/deleteCustomer/:customer_id" , auth, async (req, res) => {
  const {customer_id} = req.params
  try {
    const deleted_customer = await customerBL.deleteCustomer(customer_id, req.account_id);
    res.status(201).json({ message: `Customer ${deleted_customer.name} deleted successfully`})
  } catch (error) {
    res.status(404).json({message :error.message})
  }
})


router.put("/updateCustomer/:customer_id" , auth, async (req, res) => {
  const {customer_id} = req.params
  const update_customer = req.body
  try{
    const updated_customer = await customerBL.updateCustomer(customer_id, update_customer, req.account_id);
    res.status(201).json({message : `Customer ${updated_customer.name} Updated successfully`})
  } catch (error) {
    res.status(400).json({message: `Failed to update Customer`})
  }
})

module.exports = router;