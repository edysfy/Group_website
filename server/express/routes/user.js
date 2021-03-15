const express = require("express");
const router = express.Router();
const User = require("../../mongo_schema/user");

router.post("/signup", (req, res, next) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    geoPost: [],
  });
  user
    .save()
    .then((confirmDoc) => {
      res.status(201).json({
        message: "The user has been successfully registered",
        result: confirmDoc,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Unable to login with these credentials",
        error: error,
      });
    });
});

router.post("/login", (req, res, next) => {});

module.exports = router;