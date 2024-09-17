const User = require("../models/UserMflix.js");
const Session = require("../models/UserSession.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
  try {
    let result = await User.findOne({ email: req.query.email });
    if (!result) return res.status(404).json({ msg: "User not found" });
    if (await bcrypt.compare(req.query.password, result.password)) {
      let token = jwt.sign(
        { id: result._id, username: result.email, type: "user" },
        JWT_SECRET,
        { expiresIn: "2h" }
      );
      let session = {
        user_id: result._id,
        jwt: token,
      };
      await Session.findOneAndUpdate({ user_id: result._id }, session, {
        upsert: true,
        new: true,
      });
      return res
        .status(200)
        .json({ data: { loggedIn: true, token }, status: 200 });
    } else {
      return res.status(401).json({ msg: "Email / password is invalid" });
    }
  } catch (error) {
    console.log(error, "error");
    return res.status(404).json({ msg: "User not found" });
  }
};

const checkToken = async (req, res) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    let result = await Session.findOne({ jwt: token });
    if (!result) return res.status(404).json({ msg: "Token invalid" });
    if (!token) return res.status(401).json({ msg: "Not authenticated" });
    jwt.verify(result.jwt, JWT_SECRET);
    return res.status(200).json({ msg: "Token valid" });
  } catch (error) {
    console.log(error);
    if (["TokenExpiredError", "JsonWebTokenError"].includes(error?.name))
      return res.status(401).json({
        msg: error?.message
          .replace("jwt", "token")
          .replace("signature", "token"),
      });
    return res.status(500).json({ msg: JSON.stringify(error) });
  }
};

const forgetPassword = async (req, res) => {
  try {
    let result = await User.findOne({ email: req.body.email });
    console.log(result, "result");
    if (!result) return res.status(404).json({ msg: "User not found" });
    if (req.body.password !== req.body.retypePassword)
      return res.status(400).json({ msg: "Password Not Match" });
    let resultChange = await User.findOneAndUpdate(
      { email: req.body.email },
      { $set: { password: await bcrypt.hash(req.body.password, 10) } },
      { new: true, runValidators: true }
    );
    return res
      .status(200)
      .json({ data: {}, msg: "Please login with new password", status: 200 });
  } catch (error) {
    console.log(error, "error");

    return res.status(404).json({ msg: "User not found" });
  }
};

const register = async (req, res) => {
  let body = { ...req.body, _id: null };
  if (!req.body.password) body.password = generatePassword(8, true, true, true);
  body = { ...body, password: await bcrypt.hash(body.password, 10) };
  User.create(body)
    .then((result) => {
      return res.status(200).json({ data: result, status: 200 });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ msg: error });
    });
};

module.exports = {
  login,
  forgetPassword,
  checkToken,
  register,
};
