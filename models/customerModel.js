const mongoose = require("mongoose");

let CustomerSchema = new mongoose.Schema({
  customer_number: Number,
  name: String,
  bn: Number,
  address: {
    city: String,
    street: String,
  },
});

module.exports = mongoose.model("customers", CustomerSchema);
