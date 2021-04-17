const express = require("express");
const router = express.Router();
const {userSchema, User} = require("../../mongo_schema/user");
const jwt = require("jsonwebtoken");
const secretKey = require("../jwtsecretkey");

router.post("/signup", (req, res, next) => {
  /*cant use null as a username*/
  if (req.body.username === "null") {
    return res.json({
      message: "Username Taken",
      regSuc: false,
    });
  }
  const user = new User({
    username: req.body.username,
    /*store hashed password in database*/
    password: req.body.password,
  });
  /*save the data in mongoDb*/
  user
    .save()
    /*when promise arrives send the response back to the frontend*/
    .then((confirmDoc) => {
      res.status(201).json({
        message: "The user has been successfully registered",
        result: confirmDoc,
        regSuc: true,
      });
    })
    /*this error will be if the email/username isn't unique*/
    .catch((error) => {
      res.json({
        message: "Unable to login with these credentials",
        regSuc: false,
      });
    });
});
// });

router.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username }).then((query) => {
    /*if username not in the database query is null*/
    if (query === null) {
      return res.json({
        message: "Incorrect username",
      });
    }
    /*get the password in db and compare to the request body password*/
    const userPassword = query.password;
    passwordMatch(req.body.username, req.body.password, userPassword, res);
  });
});

async function passwordMatch(
  frontEndUsername,
  frontEndPassword,
  userHashPassword,
  res
) {
  if (frontEndPassword != userHashPassword) {
    return res.json({
      message: "Incorrect password",
    });
  }
  /*create jwt token to authenticate user in front end*/
  const token = jwt.sign(
    {
      username: frontEndUsername,
      password: frontEndPassword,
    },
    secretKey
  );
  return res.status(200).json({
    token: token,
    username: frontEndUsername,
  });
}

router.get("/:username", (req, res, next) => {
  User.findOne({ username: req.params.username })
    .then((user) => {
      const date = convertDateToString(user.dob);
      const gender = checkIfGenderNull(user.gender);
      res.status(200).json({
        user: {
          username: user.username,
          dob: date,
          gender: gender,
          age: user.age,
        },
      });
    })
    .catch((error) => {
      res.json({
        exist: false,
      });
    });
});

function convertDateToString(date) {
  if (date === null) {
    return "n/a";
  }
  return date.toDateString();
}

function checkIfGenderNull(gender) {
  if (gender === null) {
    return "n/a";
  }
  return gender;
}

/*path which updated the user details*/
router.put("/:username", (req, res, next) => {
  if (req.body.gender != null) {
    User.updateOne({ username: req.params.username }, { gender: req.body.gender })
      .then((result) => {
        res.json({message: "update gender sucessfull"})
      })
      .catch((error) => {
        res.json({message: "no user"})
      });
  } else if(req.body.dob != null) {
    User.updateOne({ username: req.params.username }, { dob: req.body.dob })
      .then((result) => {
        res.json({message: "update dob sucessfull"})
      })
      .catch((error) => {
        res.json({message: "no user"})
      });
  } else {
    User.updateOne({username: req.params.username}, {age: req.body.age})
    .then((result) => {
      res.json({message: "update age sucessfull"})
    })
    .catch((error) => {
      res.json({message: "no user"})
    });
  }
});

module.exports = router;
