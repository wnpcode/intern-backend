const express = require("express");
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.js");

router.get("/", getUsers);

router.get("/:_id", getUser);

router.post("/", createUser);

router.put("/:_id", updateUser);

router.delete("/:_id", deleteUser);

module.exports = router;
