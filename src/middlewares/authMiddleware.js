require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({ msg: "No token provided" });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (["TokenExpiredError", "JsonWebTokenError"].includes(err.name))
      return res
        .status(401)
        .json({
          msg: err.message
            .replace("jwt", "token")
            .replace("signature", "token"),
        });
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
