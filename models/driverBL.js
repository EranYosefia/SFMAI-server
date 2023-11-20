const Driver = require("./driverModel");

const getDrivers = async function (account_id) {
    return await Driver.find({account_id});
  };

  const addDriver = async function (driver) {
    const dupDriver = await Driver.findOne ({"account_id":driver.account_id,"phone_number":driver.phone_number})
    if (dupDriver){
        throw new Error (`Phone number ${driver.phone_number} already exist`)
    }
    const newDriver = await Driver.create(driver);
    newDriver.save();
  };

  const removeDriver = async function (account_id, _id) {
    const removedDriver = await Driver.findOneAndDelete({"account_id": account_id ,"_id": _id});
    if (!removedDriver){
        throw new Error("Driver not found")
    }
    return removedDriver
  }


module.exports = {
    getDrivers,
    addDriver,
    removeDriver,
  };