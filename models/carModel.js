const mongoose = require("mongoose");


let CarSchema = new mongoose.Schema({
    account_id: {type: String, require:true},
    license_plate: {type: String, require: true},
  });


module.exports = mongoose.model("cars", CarSchema);