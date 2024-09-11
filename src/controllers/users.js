const User = require("../models/User.js");
const getUsers = async (req, res) => {
  try {
    const { page = 1, size = 5 } = req.query;
    const users = await User.find()
      .limit(size * 1)
      .skip((page - 1) * size)
      .sort({ createdAt: -1 });
    const count = await User.countDocuments();
    return res.status(200).json({
      content: users,
      totalPages: Math.ceil(count / size),
      currentPage: page,
      size,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
};

const getUser = (req, res) => {
  User.findOne({ _id: req.params._id })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: "User not found" }));
};

const createUser = (req, res) => {
  let body = { ...req.body, _id: null };
  User.create(body)
    .then((result) => {
      return res.status(200).json({ result });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ msg: error });
    });
};

const updateUser = (req, res) => {
  User.findOneAndUpdate({ _id: req.params._id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: "User not found" }));
};

const deleteUser = (req, res) => {
  User.findOneAndDelete({ _id: req.params._id })
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(404).json({ msg: "User not found" }));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
