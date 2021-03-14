const mongoose = require("mongoose");
const { notEqual } = require("node:assert");

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
  dataTime: {
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
  coordinates: {
    type: geoPositionSchema,
    required: true,
  },
  properties: {
    type: postSchema,
    required: true,
  },
});

const GeoJson = mongoose.model("GeoJson", geoJsonSchema);

module.exports = GeoJson;
