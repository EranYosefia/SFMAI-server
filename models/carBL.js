const Car = require("./carModel");

const getCars = async function (account_id) {
    return await Car.find({account_id});
  };

  const addCar = async function (car) {
    const dupCar = await Car.findOne ({"account_id":car.account_id,"license_plate":car.license_plate})
    if (dupCar){
        throw new Error (`Car ${car.license_plate} already exist`)
    }
    const newCar = await Car.create(car);
    newCar.save();
  };

  const removeCar = async function (account_id, _id) {
    const removedCar = await Car.findOneAndDelete({"account_id": account_id ,"_id": _id});
    if (!removedCar){
        throw new Error("Car not found")
    }
    return removedCar
  }


  module.exports = {
    getCars,
    addCar,
    removeCar,
  };