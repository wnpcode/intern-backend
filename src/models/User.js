const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Geo Schema
const geoSchema = new Schema({
  lat: {
    type: String, // Use Number if lat/lng should be numeric
  },
  lng: {
    type: String, // Use Number if lat/lng should be numeric
  },
});

// Define the Address Schema
const addressSchema = new Schema({
  city: {
    type: String,
  },
  geo: {
    type: geoSchema,
  },
  street: {
    type: String,
  },
  suite: {
    type: String,
  },
  zipcode: {
    type: String,
  },
});

// Define the Company Schema
const companySchema = new Schema({
  bs: {
    type: String,
  },
  catchPhrase: {
    type: String,
  },
  name: {
    type: String,
  },
});

// Define the Main Schema
const UserSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  address: {
    type: addressSchema,
    default: {},
  },
  company: {
    type: companySchema,
    default: {},
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: false,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
