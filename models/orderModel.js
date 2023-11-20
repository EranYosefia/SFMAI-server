const mongoose = require("mongoose");


let OrderSchema = new mongoose.Schema({
    account_id: {type: String, require:true},
    customer_id: {type: String, require:true},
    order_number: {type:String, require:true, unique:true},


  });



module.exports = mongoose.model("drivers", OrderSchema);