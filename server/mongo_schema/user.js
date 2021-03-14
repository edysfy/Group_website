const mongoose = require("mongoose");
const uniqueValidatorPlugin = require('mongoose-unique-validator');
const GeoJson = require("./geoJson");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
      type: String,
      required: true,
  },
  geoPost: {
    type: [GeoJson],
    required: false,
}
});

userSchema.plugin(uniqueValidatorPlugin);
const User = mongoose.model('User',userSchema);

module.exports = User;