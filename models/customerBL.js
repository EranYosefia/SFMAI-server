const Customer = require("./customerModel");

const getCustomers = async function (account_id) {
  return await Customer.find({account_id});
};

const createCustomer = async function (customer) {
  const newCustomer = await Customer.create(customer);
  newCustomer.save();
};


const deleteCustomer = async function (customer_id, account_id) {
  const deleted_customer = await Customer.findOneAndDelete({"_id": customer_id, "account_id": account_id});
  return deleted_customer
}

const updateCustomer = async function (customer_id, update_customer, account_id){
  const updated_customer = await Customer.findOneAndUpdate({"_id": customer_id, "account_id": account_id} ,update_customer);
  return updated_customer
}
  

module.exports = {
  getCustomers,
  createCustomer,
  deleteCustomer,
  updateCustomer,

};
