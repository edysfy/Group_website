const express = require("express");
const { detectBufferEncoding } = require("tslint/lib/utils");
const router = express.Router();
const GeoJson = require("../../mongo_schema/geoJson");
const User = require("../../mongo_schema/user");

// {
//   minAge: 0,
//   maxAge: 100,
//   minDay: -3650,
//   maxDay: 0,
//   copingWell: true,
//   depression: true,
//   anxiety: true,
//   male: true,
//   female: true
// }

router.post("", (req, res, next) => {
  GeoJson.find()
    .populate("properties.userDetails", ["age", "gender", "dob"])
    .then((data) => {
      for(let i = 0; i<data.length; i++) {
        console.log(data[i].properties.username);
        console.log(data[i].properties.userDetails.age);
        console.log(data[i].properties.userDetails.gender);

      }
        data = data.filter(
          (geoPost) =>
            geoPost.properties.userDetails.age >= req.body.minAge &&
            geoPost.properties.userDetails.age <= req.body.maxAge
        );
      let minDate = generateDate(req.body.minDay);
      let maxDate = generateDate(req.body.maxDay);
      data = data.filter(
        (geoPost) =>
          minDate.getTime() <= geoPost.properties.dateTime.getTime() &&
          maxDate.getTime() >= geoPost.properties.dateTime.getTime()
      );
      data = filterGender(req.body.male, req.body.female, data);
      data = filterMood(
        req.body.copingWell,
        req.body.depression,
        req.body.anxiety,
        data
      );
      res.status(200).json({ message: "search", geoSearchArray: data });
    })
    .catch((err) => {
      res.status(401).json({ error: err });
      return;
    });
});

function generateDate(daysFromPresent) {
  let date = new Date();
  date.setDate(date.getDate() + daysFromPresent);
  return date;
}

function filterGender(male, female, data) {
  if (male && female) {
  } else if (male) {
    data = data.filter(
      (geoPost) => geoPost.properties.userDetails.gender === "male"
    );
  } else if (female) {
    data = data.filter(
      (geoPost) => geoPost.properties.userDetails.gender === "female"
    );
  } else {
    data = [];
  }
  return data;
}

function filterMood(copingWell, depression, anxiety, data) {
  if (copingWell && depression && anxiety) {
  } else if (copingWell && depression && !anxiety) {
    data = data.filter(
      (geoPost) =>
        geoPost.properties.mood === 1 || geoPost.properties.mood === 2
    );
  } else if (copingWell && !depression && anxiety) {
    data = data.filter(
      (geoPost) =>
        geoPost.properties.mood === 1 || geoPost.properties.mood === 3
    );
  } else if (!copingWell && depression && anxiety) {
    data = data.filter(
      (geoPost) =>
        geoPost.properties.mood === 2 || geoPost.properties.mood === 3
    );
  } else if (copingWell && !depression && !anxiety) {
    data = data.filter((geoPost) => geoPost.properties.mood === 1);
  } else if (!copingWell && depression && !anxiety) {
    data = data.filter((geoPost) => geoPost.properties.mood === 2);
  } else if (!copingWell && !depression && anxiety) {
    data = data.filter((geoPost) => geoPost.properties.mood === 3);
  } else {
    data = [];
  }
  return data;
}

module.exports = router;
