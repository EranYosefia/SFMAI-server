const express = require("express");
const carBL = require("../models/carBL.js");
const auth = require("../middleware/auth");

const router = express.Router();


router.get("/getCars", auth, async (req, res) => {
    const account_id = req.account_id
    const cars = await carBL.getCars(account_id);
    return res.json(cars);
  });

router.post("/addNewCar", auth, async (req, res) => {
  const car = req.body;
  car.account_id = req.account_id

  try {
    await carBL.addCar(car);
    res.status(201).json({ message: `New Car ${car.license_plate} added successfully` });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

router.delete("/removeCar/:_id" , auth, async (req, res) => {
    const {_id} = req.params
    try {
    const removedCar =  await carBL.removeCar(req.account_id, _id);
      res.status(201).json({ message: `Car ${removedCar.license_plate} deleted successfully`})
    } catch (error) {
      res.status(404).json({message :error.message})
    }
  })




module.exports = router;