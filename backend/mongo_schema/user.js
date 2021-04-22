const mongoose = require("mongoose");
const uniqueValidatorPlugin = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    default: null,
    required: false,
  },
  gender: {
    type: String,
    default: null,
    required: false,
  },
  age: {
    type: Number,
    default: null,
    required: false,
  },
});

/*unique validator is a plugin that sends detailed responses if 
values aren't unique*/
userSchema.plugin(uniqueValidatorPlugin);
module.exports = mongoose.model("User", userSchema);
