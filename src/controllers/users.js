const User = require("../models/User.js");
const getUsers = async (req, res) => {
  try {
    const { page = 1, size = 5, name = "" } = req.query;
    let query = {};
    if (name) query["name"] = { $regex: name, $options: "i" };
    const users = await User.find(query)
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
    res.status(500).json({ msg: error });
  }
};

const getUser = (req, res) => {
  User.findOne({ _id: req.params._id })
    .then((result) => res.status(200).json({ data: result, status: 200 }))
    .catch(() => res.status(404).json({ msg: "User not found" }));
};

const createUser = (req, res) => {
  let body = { ...req.body, _id: null };
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
  await User.findOneAndUpdate(
    { _id: req.params._id },
    { $set: req.body },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((result) => res.status(200).json({ data: result, status: 200 }))
    .catch((error) => res.status(404).json({ msg: "User not found" }));
};

const deleteUser = async (req, res) => {
  await User.findOneAndDelete({ _id: req.params._id })
    .then((result) => res.status(200).json({ data: result, status: 200 }))
    .catch((error) => res.status(404).json({ msg: "User not found" }));
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
