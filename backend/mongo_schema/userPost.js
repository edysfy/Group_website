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

const userPostSchema = new mongoose.Schema({
   mood: {
      type: Number,
      required: true,
   },
   keyword: {
      type: String,
      required: true,
   },
   textBody: {
      type: String,
      required: true,
   },
   geometry: {
      geoPositionSchema
   },
});

module.exports = mongoose.model("userPost", userPostSchema);
