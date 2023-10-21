const customerModel = require("./customerModel");

const getCustomers = async function () {
  return await customerModel.find({});
};

const createCustomer = async function (user) {
  const newCustomer = await customerModel.create(user);
  newCustomer.save();
};

module.exports = {
  getCustomers,
  createCustomer,
};
