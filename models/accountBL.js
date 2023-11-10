const { Account, NewAccountValidate } = require("./accountModel");
const { ObjectId } = require("mongodb");
const bcryptjs = require("bcryptjs");

const saltRounds = 10;

const registration = async function (account) {
  NewAccountValidate(account);

  const { password, email, business_number, business_name } = account;

  const found_email = await Account.findOne({ email: email });
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

module.exports = { registration };
