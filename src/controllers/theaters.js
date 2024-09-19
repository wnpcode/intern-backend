const Theater = require("../models/Theater.js");
const getTheaters = async (req, res) => {
  try {
    const { page = 1, size = 5, name = "" } = req.query;
    let query = {};
    if (name) query["name"] = { $regex: name, $options: "i" };
    const theaters = await Theater.find(query)
      .select("-password")
      .limit(size * 1)
      .skip((page - 1) * size)
      .sort({ createdAt: -1 });
    // const element = await Theater.find(query).count();
    const count = await Theater.countDocuments(query);

    return res.status(200).json({
      data: theaters,
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

const getTheater = async (req, res) => {
  try {
    let result = await Theater.result({ _id: req.params._id });
    return res.status(200).json({ data: result, status: 200 });
  } catch (error) {
    return res.status(404).json({ msg: "Theater not found" });
  }
};

const createTheater = async (req, res) => {
  let body = { ...req.body, _id: null };
  Theater.create(body)
    .then((result) => {
      return res.status(200).json({ data: result, status: 200 });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ msg: error });
    });
};

const updateTheater = async (req, res) => {
  try {
    let result = await Theater.findOneAndUpdate(
      { _id: req.params._id },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json({ data: result, status: 200 });
  } catch (error) {
    return res.status(404).json({ msg: "Theater not found" });
  }
};

const deleteTheater = async (req, res) => {
  try {
    let result = await Theater.findOneAndDelete({ _id: req.params._id });
    return res.status(200).json({ data: result, status: 200 });
  } catch (error) {
    return res.status(404).json({ msg: "Theater not found" });
  }
};

module.exports = {
  getTheaters,
  getTheater,
  createTheater,
  updateTheater,
  deleteTheater,
};
