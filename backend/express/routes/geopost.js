const express = require("express");
const router = express.Router();
const GeoJson = require("../../mongo_schema/geoJson");



/*gets all post from the db*/
router.get("", (req, res, next) => {
  GeoJson.find()
  .then((allGeoPost) => {
    res
      .status(200)
      .json({
        message: "Coordinates sent from database",
        geoPost: allGeoPost,
      })
  })
  .catch((error) => {
    res.status(401).json({
      message: "unable to retrieve the data",
      error: error,
    });
  });
});

