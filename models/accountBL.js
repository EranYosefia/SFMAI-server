const { Account, NewAccountValidate } = require("./accountModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const handleRegister = async function (account) {
  NewAccountValidate(account);

  const { password, email, business_number, business_name } = account;

  const found_email = await Account.findOne({ email });
  if (found_email) throw new Error("Account already exist.");

  const found_business_number = await Account.findOne({
    business_number: business_number,
  });
  if (found_business_number)
    return res.status(409).send("Business number already exist.");

  const found_business_name = await Account.findOne({
    business_name: business_name,
  });
  if (found_business_name)
    return res.status(409).send("Account already exist.");

  const newAccount = account;
  bcryptjs.hash(password, saltRounds, async (err, hash) => {
    newAccount.password = hash;
    const returnAccount = await Account.create(account);
    returnAccount.save();
  });
};

const handleLogin = async function (business_number, password) {
  if (!business_number || !password) throw new Error('Email or password not found');
  const account = await Account.findOne({ business_number });
  if (!account) throw new Error(`Account [${business_number}] not found`);
  const isValid = await bcryptjs.compare(password, account.password);
  if (!isValid) throw new Error('Password is incorrect');
  const accountToken = {business_number: business_number}
  return jwt.sign(accountToken, process.env.ACCESS_TOKEN_SECRET)
};

module.exports = { handleRegister, handleLogin };
