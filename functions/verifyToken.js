const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = verified;
    console.log(req.user, "verifed");
    next();
  } catch (error) {
    console.log("invalid token => ", token, error);
    res.status(400).send("Invalid Token");
  }
}

module.exports = verifyToken;
