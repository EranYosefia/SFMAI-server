const jwt = require("jsonwebtoken");

function authValidation(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = email;
    next();
  });
}