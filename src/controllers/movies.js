const Movie = require("../models/Movie.js");
const getMovies = async (req, res) => {
  try {
    const { page = 1, size = 5, name = "" } = req.query;
    let query = {};
    if (name) query["name"] = { $regex: name, $options: "i" };
    const theaters = await Movie.find(query)
      .select("-password")
      .limit(size * 1)
      .skip((page - 1) * size)
      .sort({ createdAt: -1 });
    // const element = await Movie.find(query).count();
    const count = await Movie.countDocuments(query);

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

const getMovie = async (req, res) => {
  try {
    let result = await Movie.result({ _id: req.params._id });
    return res.status(200).json({ data: result, status: 200 });
  } catch (error) {
    return res.status(404).json({ msg: "Movie not found" });
  }
};

const createMovie = async (req, res) => {
  let body = { ...req.body, _id: null };
  Movie.create(body)
    .then((result) => {
      return res.status(200).json({ data: result, status: 200 });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ msg: error });
    });
};

const updateMovie = async (req, res) => {
  try {
    let result = await Movie.findOneAndUpdate(
      { _id: req.params._id },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );
    return res.status(200).json({ data: result, status: 200 });
  } catch (error) {
    return res.status(404).json({ msg: "Movie not found" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    let result = await Movie.findOneAndDelete({ _id: req.params._id });
    return res.status(200).json({ data: result, status: 200 });
  } catch (error) {
    return res.status(404).json({ msg: "Movie not found" });
  }
};

module.exports = {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};
