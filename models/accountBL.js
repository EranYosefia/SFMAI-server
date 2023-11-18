const { Account, NewAccountValidate } = require("./accountModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const handleRegister = async function (account) {
  NewAccountValidate(account);

  const { login_id, password, email, account_id, business_name } = account;

  const found_login_id = await Account.findOne({ login_id });
  if (found_login_id) throw new Error("Account already exist.");

  // const found_email = await Account.findOne({ email });
  // if (found_email) throw new Error("Account already exist.");

  // const found_business_number = await Account.findOne({
  //   business_number: business_number,
  // });
  // if (found_business_number)
  //   return res.status(409).send("Business number already exist.");

  // const found_business_name = await Account.findOne({
  //   business_name: business_name,
  // });
  // if (found_business_name)
  //   return res.status(409).send("Account already exist.");

  
  const found_account_id = await Account.findOne({
    account_id: account_id,
  });
  if (!found_account_id)
    account.amount_of_stations = 1
  else{

  }
  
  const newAccount = account;
  bcryptjs.hash(password, saltRounds, async (err, hash) => {
    newAccount.password = hash;
    account.password = hash;
    const returnAccount = await Account.create(account);
    returnAccount.save();
  });
};

const handleLogin = async function (login_id, password) {
  if (!login_id || !password) throw new Error('Email or password not found');
  const account = await Account.findOne({ login_id });
  if (!account) throw new Error(`Account [${login_id}] not found`);
  const isValid = await bcryptjs.compare(password, account.password);
  if (!isValid) throw new Error('Password is incorrect');
  const accountToken = {account_id: account.account_id}
  return jwt.sign(accountToken, process.env.ACCESS_TOKEN_SECRET)
};

module.exports = { handleRegister, handleLogin };
