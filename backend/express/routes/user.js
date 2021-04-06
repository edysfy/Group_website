const express = require("express");
const router = express.Router();
const User = require("../../mongo_schema/user");
//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = require("../jwtsecretkey");

router.post("/signup", (req, res, next) => {
  // const saltRounds = 10;
  // /*looked online and bcrypt is good lib to hash/secure passwords*/
  // bcrypt.hash(req.body.password, saltRounds).then((hashedPassword) => {
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
// });

router.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username }).then((query) => {
    /*if username not in the database query is null*/
    if (query === null) {
      return res.status(404).json({
        message: "Incorrect username",
        login: false,
      });
    }
    /*get the password in db and compare to the request body password*/
    const userHashPassword = query.password;
    passwordMatch(req.body.username, req.body.password, userHashPassword, res);
  });
});

async function passwordMatch(
  frontEndUsername,
  frontEndPassword,
  userHashPassword,
  res
) {
  // /*compare passwords and send correct response*/
  // const comparePromise = bcrypt.compare(frontEndPassword, userHashPassword);
  // const doPasswordsMatch = await comparePromise;

  if (!frontEndPassword!=userHashPassword) {
    return res.status(406).json({
      message: "Incorrect password",
      login: false,
    });
  }
  /*create jwt token to authenticate user in front end*/
  const token = jwt.sign(
    {
      username: frontEndUsername,
      password: frontEndPassword,
    },
    secretKey,
    { expiresIn: "1h" },
  );
  return res.status(200).json({
    token: token,
    expireIn: 3600,
  });
}

module.exports = router;
