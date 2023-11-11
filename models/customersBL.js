const Customer = require("./customerModel");

const getCustomers = async function (business_number) {
  return await Customer.find({customers_id: business_number});
};

const createCustomer = async function (customer) {
  const newCustomer = await Customer.create(customer);
  newCustomer.save();
};

module.exports = {
  getCustomers,
  createCustomer,
};
