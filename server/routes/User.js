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
      console.log(u);
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
            return res.json({ user: result, success: true });
          })
          .catch((err) => {
            console.log(err);
            return res.json({ error: "user already exist", success: false });
          });
      } else {
        return res.json({ error: "user already exist", success: false });
      }
    })
    .catch(() => {
      return res.json({ error: "user already exist", success: false });
    });
});

router.get("/alluser", requireLogin, (req, res) => {
  User.find()
    .then((users) => {
      res.json({ users, success: true });
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
        return res.json(result);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.get("/auth/admin", requireLogin, (req, res) => {
  return res.json({ success: true });
});

module.exports = router;
