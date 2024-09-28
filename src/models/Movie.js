const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the awards schema
const awardsSchema = new Schema({
  nominations: {
    type: Number, // Equivalent to Int32
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  wins: {
    type: Number, // Equivalent to Int32
    required: true,
  },
});

// Define the IMDb schema
const imdbSchema = new Schema({
  id: {
    type: Number, // Equivalent to Int32
    required: true,
  },
  rating: {
    type: Schema.Types.Mixed, // Can be Double or String
    required: true,
  },
  votes: {
    type: Schema.Types.Mixed, // Can be Int32 or String
    required: true,
  },
});

// Define the Critic Schema
const criticSchema = new Schema({
  meter: {
    type: Schema.Types.Mixed, // Int32 or Undefined
    default: undefined, // Can be undefined
  },
  numReviews: {
    type: Schema.Types.Mixed, // Int32 or Undefined
    default: undefined, // Can be undefined
  },
  rating: {
    type: Schema.Types.Mixed, // Double or Undefined
    default: undefined, // Can be undefined
  },
});

// Define the Viewer Schema
const viewerSchema = new Schema({
  meter: {
    type: Schema.Types.Mixed, // Int32 or Undefined
    default: undefined, // Can be undefined
  },
  numReviews: {
    type: Number, // Int32
    required: true, // Always present
  },
  rating: {
    type: Schema.Types.Mixed, // Double or Undefined
    default: undefined, // Can be undefined
  },
});

// Define the Tomatoes Schema
const tomatoesSchema = new Schema({
  boxOffice: {
    type: Schema.Types.Mixed, // String or Undefined
    default: undefined, // Can be undefined
  },
  consensus: {
    type: Schema.Types.Mixed, // String or Undefined
    default: undefined, // Can be undefined
  },
  critic: {
    type: criticSchema, // Nested Critic document
    default: undefined, // Can be undefined
  },
  dvd: {
    type: Schema.Types.Mixed, // Date or Undefined
    default: undefined, // Can be undefined
  },
  fresh: {
    type: Schema.Types.Mixed, // Int32 or Undefined
    default: undefined, // Can be undefined
  },
  lastUpdated: {
    type: Date, // Always present
    required: true,
  },
  production: {
    type: Schema.Types.Mixed, // String or Undefined
    default: undefined, // Can be undefined
  },
  rotten: {
    type: Schema.Types.Mixed, // Int32 or Undefined
    default: undefined, // Can be undefined
  },
  viewer: {
    type: viewerSchema, // Nested Viewer document
    required: true, // Always present
  },
  website: {
    type: Schema.Types.Mixed, // String or Undefined
    default: undefined, // Can be undefined
  },
});

// Define the parent schema that includes the awards subdocument
const moviesSchema = new Schema({
  theaterId: {
    type: [Schema.Types.ObjectId], // Always a string
    required: true,
  },
  awards: {
    type: awardsSchema,
    required: true,
  },
  cast: {
    type: [String], // This defines an array of strings
    default: undefined, // Default value is undefined if not present
  },
  countries: {
    type: [String], // Array of strings
    required: true, // Since `count: 1000`, it's always present
  },
  directors: {
    type: [String], // Array of strings
    default: undefined, // Can be undefined (if the field is missing)
  },
  fullplot: {
    type: String,
    default: undefined, // Can be undefined
  },
  genres: {
    type: [String], // Array of strings
    default: undefined, // Can be undefined
  },
  imdb: {
    type: imdbSchema, // Nested document for IMDb
    required: true,
  },
  languages: {
    type: [String], // Array of strings
    default: undefined, // Can be undefined
  },
  lastupdated: {
    type: String, // Always a string
    required: true, // Since count is 1000
  },
  metacritic: {
    type: Schema.Types.Mixed, // Can be Int32 or Undefined
    default: undefined, // Can be undefined
  },
  num_mflix_comments: {
    type: Number, // Equivalent to Int32
    required: true,
  },
  plot: {
    type: String, // Always a string
    default: undefined, // Can be undefined
  },
  poster: {
    type: String, // String with the possibility of being undefined
    default: undefined, // Can be undefined
  },
  rated: {
    type: Schema.Types.Mixed, // Can be String or Undefined
    default: undefined, // Can be undefined
  },
  released: {
    type: Date, // Date with the possibility of being undefined
    default: undefined, // Can be undefined
  },
  runtime: {
    type: Schema.Types.Mixed, // Can be Int32 or Undefined
    default: undefined, // Can be undefined
  },
  title: {
    type: String, // Always a string
    required: true, // Since count is 1000
  },
  tomatoes: {
    type: tomatoesSchema, // Nested Tomatoes document
    default: undefined, // Can be undefined
  },
  type: {
    type: String, // Always a string
    required: true, // Since count is 1000
  },
  writers: {
    type: [String], // Array of strings
    required: true,
    default: [],
  },
  year: {
    type: mongoose.Schema.Types.Mixed, // Mixed type to allow both Int32 and String
    required: true,
    validate: {
      validator: function (v) {
        return (
          typeof v === "number" || // Int32
          (typeof v === "string" && v.match(/^\d{4}è$/)) // String with format 'YYYYè'
        );
      },
      message: (props) => `${props.value} is not a valid year format!`,
    },
  },
});

// Create a Mongoose model
const Movies = mongoose.model("Movies", moviesSchema);

// Export the model
module.exports = Movies;
