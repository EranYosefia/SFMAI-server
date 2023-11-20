const express = require("express");
const driverBL = require("../models/driverBL");
const auth = require("../middleware/auth");

const router = express.Router();


router.get("/getDrivers", auth, async (req, res) => {
    const account_id = req.account_id
    const drivers = await driverBL.getDrivers(account_id);
    return res.json(drivers);
  });

  router.post("/addNewDriver", auth, async (req, res) => {
    const driver = req.body;
    driver.account_id = req.account_id
  
    try {
      await driverBL.addDriver(driver);
      res.status(201).json({ message: `New Driver ${driver.name} added successfully` });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  });

  router.delete("/removeDriver/:_id" , auth, async (req, res) => {
    const {_id} = req.params
    try {
    const removedDriver =  await driverBL.removeDriver(req.account_id, _id);
      res.status(201).json({ message: `Driver ${removedDriver.name} deleted successfully`})
    } catch (error) {
      res.status(404).json({message :error.message})
    }
  })




module.exports = router;