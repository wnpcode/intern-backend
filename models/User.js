const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the Geo Schema
const geoSchema = new Schema({
  lat: {
    type: String, // Use Number if lat/lng should be numeric
    required: true,
  },
  lng: {
    type: String, // Use Number if lat/lng should be numeric
    required: true,
  },
});

// Define the Address Schema
const addressSchema = new Schema({
  city: {
    type: String,
    required: true,
  },
  geo: {
    type: geoSchema,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  suite: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
});

// Define the Company Schema
const companySchema = new Schema({
  bs: {
    type: String,
    required: true,
  },
  catchPhrase: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// Define the Main Schema
const UserSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
  company: {
    type: companySchema,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
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
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
