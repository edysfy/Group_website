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
  

const dummyGJSchema = new mongoose.Schema({
    type: String,
    properties: {
        id: String,
        moodRating: Number,
        time: Number,
        felt: Number,
        tsunami: Number,
    },
    geometry: geoPositionSchema
})


const DummySchema = new mongoose.Schema({
   type: String,
   features: [dummyGJSchema]

},{ versionKey: false }) 


module.exports = mongoose.model("Dummy",DummySchema);