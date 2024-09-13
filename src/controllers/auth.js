const User = require("../models/UserMflix.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
  try {
    let result = await User.findOne({ email: "string" });
    if (!result) return res.status(404).json({ msg: "User not found" });
    if (await bcrypt.compare(req.query.password, result.password)) {
      let token = jwt.sign(
        { id: result._id, username: result.email, type: "user" },
        JWT_SECRET,
        { expiresIn: "2h" }
      );
      return res
        .status(200)
        .json({ data: { loggedIn: true, token }, status: 200 });
    }
  } catch (error) {
    console.log(error, "error");

    return res.status(404).json({ msg: "User not found" });
  }
};

module.exports = {
  login,
};
