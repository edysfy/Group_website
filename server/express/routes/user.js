const express = require("express");
const router = express.Router();
const User = require("../../mongo_schema/user");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res, next) => {
  const saltRounds = 10;
  /*looked online and bcrypt is good lib to hash/secure passwords*/
  bcrypt.hash(req.body.password, saltRounds).then((hashedPassword) => {
    /*create user model with request body parameters*/
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      /*store hashed password in database*/
      password: hashedPassword,
      geoPost: [],
    });
    /*save the data in mongoDb*/
    user
      .save()
      /*when promise arrives send the response back to the frontend*/
      .then((confirmDoc) => {
        res.status(201).json({
          message: "The user has been successfully registered",
          result: confirmDoc,
        });
      })
      /*this error will be if the email/username isn't unique*/
      .catch((error) => {
        res.status(500).json({
          message: "Unable to login with these credentials",
          error: error,
        });
      });
  });
});

router.post("/login", (req, res, next) => {});

module.exports = router;
