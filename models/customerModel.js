const mongoose = require("mongoose");

let CustomerSchema = new mongoose.Schema({
  account_id: {type: String, require: true },
  name: {type: String, require: true, unique: true },
  city: {type: String, require: true },
  street: {type: String, require: true },
});

module.exports = mongoose.model("customers", CustomerSchema);
