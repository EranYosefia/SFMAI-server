const mongoose = require("mongoose");

let DriverSchema = new mongoose.Schema({
    account_id: {type: String, require:true},
    name: {type: String, require: true},
    phone_number: {type: String},

  });

module.exports = mongoose.model("drivers", DriverSchema);