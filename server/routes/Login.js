const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const requireLogin = require("../middleware/requireLogin");
require("dotenv").config();

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please enter all fields" });
  }
  Admin.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: "User dont exist" });
      }
      if (savedUser.password != password) {
        return res.status(422).json({ error: "Password or email don't match" });
      }
      if (savedUser.password == password) {
        const token = jwt.sign(
          { email: savedUser.email, _id: savedUser._id },
          process.env.SECRET_KEY,{
            expiresIn: "300sec",
          }
        );
        const { email } = savedUser;
        res.json({
          token,
          user: { email, id: savedUser._id },
        });
      }
    })
    .catch(() => {
      return res.status(404).json({ error: "Something went wrong" });
    });
});
router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "all fields should be filled completely" });
  }
  Admin.findOne({ email })
    .then(async (savedUser) => {
      if (savedUser) {
        return res.status(422).json({ error: "User already exist" });
      }
      const admin = new Admin({
        email,
        password,
      });
      admin
        .save()
        .then((result) => {
          return res.status(200).json({ message: "User saved successfully" });
        })
        .catch((error) => {
          return res
            .status(422)
            .json({ error: "Something went wrong while creating user" });
        });
    })
    .catch((error) => {
      return res.status(404).json({ error: "Something went wrong" });
    });
});
module.exports = router;
