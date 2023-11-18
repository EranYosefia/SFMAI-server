const mongoose = require("mongoose");
const Joi = require("joi");

const AccountSchema = new mongoose.Schema({
  login_id: { type: String, required: true, unique: true },
  account_id: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  amount_of_stations: { type: Number, required: true },
  business_name: { type: String, required: true },
  city: String,
  street: String,
  postal_code: String,
  created: { type: Date, default: Date.now },
});

const NewAccountSchema = Joi.object({
  login_id: Joi.string()
  .min(6)
  .max(30),
  account_id: Joi.string()
    .regex(/[0-9]{3,30}/)
    .required(),
  password: Joi.string()
    .min(6)
    .max(30)
    .regex(/[a-zA-Z0-9]{3,30}/)
    .required(),
  email: Joi.string().email().required(),
  business_name: Joi.string().required(),
  city: Joi.string().required(),
  street: Joi.string().required(),
  postal_code: Joi.string()
    .regex(/[0-9]{3,30}/)
    .required(),
  created: Joi.date(),
});

const NewAccountValidate = (account) => {
  const { error } = NewAccountSchema.validate(account);
  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
  return NewAccountSchema.validate(account);
};

const Account = mongoose.model("accounts", AccountSchema);

module.exports = { Account, NewAccountValidate };
