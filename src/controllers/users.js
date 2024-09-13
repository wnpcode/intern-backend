const User = require("../models/UserMflix.js");
const { generatePassword } = require("../utils/utils.js");
const bcrypt = require("bcrypt");
const getUsers = async (req, res) => {
  try {
    const { page = 1, size = 5, name = "" } = req.query;
    let query = {};
    if (name) query["name"] = { $regex: name, $options: "i" };
    const users = await User.find(query)
      .select("-password")
      .limit(size * 1)
      .skip((page - 1) * size)
      .sort({ createdAt: -1 });
    // const element = await User.find(query).count();
    const count = await User.countDocuments(query);

    return res.status(200).json({
      data: users,
      totalPages: Math.ceil(count / size),
      // element: parseInt(element),
      currentPage: parseInt(page),
      size: parseInt(size),
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error });
  }
};

const getUser = async (req, res) => {
  try {
    let result = await User.result({ _id: req.params._id });
    return res.status(200).json({ data: result, status: 200 });
  } catch (error) {
    return res.status(404).json({ msg: "User not found" });
  }
};

const createUser = async (req, res) => {
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

const updateUser = async (req, res) => {
  try {
    let result = await User.findOneAndUpdate(
      { _id: req.params._id },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json({ data: result, status: 200 });
  } catch (error) {
    return res.status(404).json({ msg: "User not found" });
  }
};

const deleteUser = async (req, res) => {
  try {
    let result = await User.findOneAndDelete({ _id: req.params._id });
    return res.status(200).json({ data: result, status: 200 });
  } catch (error) {
    return res.status(404).json({ msg: "User not found" });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
