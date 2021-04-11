const mongoose = require("mongoose");

const geoPositionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

const postSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  keyword: {
    type: String,
    required: true,
  },
  mood: {
    type: Number,
    required: true,
  },
  textBody: {
    type: String,
    required: true,
  },
});

const geoJsonSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  location: {
    type: geoPositionSchema,
    required: true,
  },
  properties: {
    type: postSchema,
    required: true,
  },
});

module.exports = mongoose.model("GeoJson", geoJsonSchema);
