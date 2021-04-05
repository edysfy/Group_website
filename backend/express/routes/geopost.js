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

/*saves a post to the database*/
router.post("", (req, res, next) => {
  const newPost = new GeoJson({
    type: req.body.type,
    location: {
      type: req.body.location.type,
      coordinates: [
        req.body.location.coordinates[0],
        req.body.location.coordinates[1],
      ],
    },
    properties: {
      dateTime: req.body.properties.dateTime,
      keyword: req.body.properties.keyword,
      mood: req.body.properties.mood,
      textBody: req.body.properties.textBody,
    },
  });
  newPost
    .save()
    .then((dbResponse) => {
      return res.status(200).json({
        message: "geoPost saved in database",
        id: dbResponse,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "unable to save this data",
        error: error,
      });
    });
});

/*removes post from the db*/
router.delete("", (req, res, next) => {
  GeoJson.deleteOne({ _id: req.body._id })
    .then((result) => {
      res
      .status(200)
      .json({
        message: "Post deleted",
        result: result,
      });
    })
    .catch((error) => {
      res
      .status(401)
      .json({
        message: "Post doesn't exist",
        error: error,
      });
    });
});

module.exports = router;
