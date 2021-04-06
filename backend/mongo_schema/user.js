const mongoose = require("mongoose");
const uniqueValidatorPlugin = require('mongoose-unique-validator');
const GeoJson = require("./geoJson").schema;

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

/*unique validator is a plugin that sends detailed responses if 
values aren't unique*/
userSchema.plugin(uniqueValidatorPlugin);
module.exports = mongoose.model('User',userSchema);