const Customer = require("./customerModel");

const getCustomers = async function () {
  return await Customer.find({});
};

const createCustomer = async function (customer) {
  const newCustomer = await Customer.create(customer);
  newCustomer.save();
};

module.exports = {
  getCustomers,
  createCustomer,
};
