const jwt = require("jsonwebtoken");

function authValidation(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({ message: "Token is not found" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, {account_id}) => {
    if (err) {
      return res.status(403).json({ message: "Wrong token" });
    }
    req.account_id = account_id;
    next();
  });
}

module.exports = authValidation;