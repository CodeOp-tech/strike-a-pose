var express = require("express");
var router = express.Router();
// var jwt = require("jsonwebtoken");
// var userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");
var db = require("../model/helper");
// require("dotenv").config();
// var bcrypt = require("bcrypt");
// const saltRounds = 10;

// const supersecret = process.env.SUPER_SECRET;

router.get("/", function (req, res, next) {
  db("SELECT * FROM users;")
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => res.status(500).send(err));
});

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    const results = await db(`SELECT * FROM users where id = ${id};`);
    if (!results.data.length) {
      res.status(404).send({ msg: "User not found" });
    }
    res.send(results.data[0]);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async function (req, res, next) {
  const { username, password } = req.body;
  try {
    await db(
      `INSERT INTO users (username, password) VALUES ('${username}', '${password}');`
    );
    const results = await db(`SELECT * FROM users;`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete("/:id", async function (req, res, next) {
  const { id } = req.params;
  try {
    const user = await db(`SELECT * FROM users WHERE id = ${id};`);
    if (!user.data.length) {
      res.send({ msg: "User not found" });
    } else {
      await db(`DELETE FROM users WHERE id = ${id};`);
      const results = await db(`SELECT * FROM users;`);
      res.send(results.data);
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//Registration

// router.post("/register", async (req, res) => {
//   const { username, password } = req.body;

//   if (!password || !username) {
//     return res.status(400).send({ message: "Invalid password" });
//   }

//   try {
//     const hash = await bcrypt.hash(password, saltRounds);

//     await db(
//       `INSERT INTO users (username, password) VALUES ("${username}", "${password}", "${hash}")`
//     );

//     res.send({ message: "Register successful" });
//   } catch (err) {
//     res.status(400).send({ message: err.message });
//   }
// });

// //Login
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     const results = await db(
//       `SELECT * FROM users WHERE username = "${username}"`
//     );
//     const user = results.data[0];
//     //check if the user exists
//     if (user) {
//       const user_id = user.id;
//       //check if the password is correct
//       const correctPassword = await bcrypt.compare(password, user.password);
//       //if the password is not correct throw this error
//       if (!correctPassword) throw new Error("Incorrect password");
//       //if the password is correct create a token
//       var token = jwt.sign({ user_id }, supersecret);
//       res.send({ message: "Login successful, here is your token", token });
//     } else {
//       throw new Error("User does not exist");
//     }
//   } catch (err) {
//     res.status(400).send({ message: err.message });
//   }
// });

// router.get("/profile", userShouldBeLoggedIn, (req, res) => {
//   res.send({
//     message: "Here is the PROTECTED data for user " + req.user_id,
//   });
// });

module.exports = router;
