const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const requireLogin = require("../middleware/requireLogin");
require("dotenv").config();

router.post("/createuser", requireLogin, (req, res) => {
  const { username, email, mobile, address } = req.body;
  if (!username || !email || !mobile || !address) {
    return res.status(422).json({ error: "Plase add all the fields" });
  }
  User.findOne({ username })
    .then((u) => {
      console.log(u)
      if (!u) {
        const user = new User({
          username,
          email,
          mobile,
          address,
        });
        user
          .save()
          .then((result) => {
            return res.json({ user: result });
          })
          .catch((err) => {
            console.log(err);
            return res.json({ error: "user already exist" });
          });
      }else{
        return res.json({ error: "user already exist" });
      }
    })
    .catch(() => {
      return res.json({ error: "user already exist" });
    });
});

router.get("/alluser", requireLogin, (req, res) => {
  User.find()
    .then((users) => {
      res.json({ users });
    })
    .catch((error) => {
      console.log("error allpost route");
    });
});

router.delete("/deleteuser/:username", requireLogin, (req, res) => {
  User.findOne({ username: req.params.username }).exec((err, user) => {
    if (err || !user) {
      return res.status(422).json({ error: err });
    }
    user
      .remove()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

module.exports = router;
