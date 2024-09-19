const mongoose = require("mongoose");
const { Schema } = mongoose;

const AddressSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  street1: {
    type: String,
    required: true,
  },
  street2: {
    type: String,
    required: false,
    default: null,
  },
  zipcode: {
    type: String,
    required: true,
  },
});

const GeoSchema = new mongoose.Schema({
  coordinates: {
    type: [Number], // Array of doubles
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Point"], // Assuming 'type' is usually 'Point' for GeoJSON
  },
});

const LocationSchema = new mongoose.Schema({
  address: {
    type: AddressSchema,
    required: true,
  },
  geo: {
    type: GeoSchema,
    required: true,
  },
});

const TheaterSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  location: {
    type: LocationSchema,
    required: true,
  },
  theaterId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Theater = mongoose.model("Theater", TheaterSchema);

module.exports = Theater;
