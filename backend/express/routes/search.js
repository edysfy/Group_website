const express = require("express");
const router = express.Router();
const GeoJson = require("../../mongo_schema/geoJson");
const User = require("../../mongo_schema/user");

router.post("", (req, res, next) => {
  console.log("dfdf");
  GeoJson.find()
    .populate("properties.userDetails",["age","gender","dob"])
    .then((data) => {
      res.status(200).json({ d: data });
    })
    .catch((err) => {
      console.log(err);
      return;
    });
});

module.exports = router;
