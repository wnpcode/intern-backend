const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Main Schema
const SessionSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  jwt: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("Session", SessionSchema);

module.exports = User;
