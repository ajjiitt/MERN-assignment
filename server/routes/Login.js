const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ error: "Please enter all fields", success: false });
  }
  Admin.findOne({ email: email })
    .then((savedUser) => {
      if (!savedUser) {
        return res
          .status(422)
          .json({ error: "User dont exist", success: false });
      }
      if (savedUser.password != password) {
        return res
          .status(422)
          .json({ error: "Password or email don't match", success: false });
      }
      if (savedUser.password == password) {
        const token = jwt.sign(
          { email: savedUser.email, _id: savedUser._id },
          process.env.SECRET_KEY,
          {
            expiresIn: "300sec",
          }
        );
        const { email } = savedUser;
        res.json({
          token,
          user: { email, id: savedUser._id },
          success: true,
        });
      }
    })
    .catch(() => {
      return res
        .status(404)
        .json({ error: "Something went wrong", success: false });
    });
});
router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      error: "all fields should be filled completely",
      success: false,
    });
  }
  Admin.findOne({ email })
    .then(async (savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already exist", success: false });
      }
      const admin = new Admin({
        email,
        password,
      });
      admin
        .save()
        .then((result) => {
          return res
            .status(200)
            .json({ message: "User saved successfully", success: true });
        })
        .catch((error) => {
          return res.status(422).json({
            error: "Something went wrong while creating user",
            success: false,
          });
        });
    })
    .catch((error) => {
      return res
        .status(404)
        .json({ error: "Something went wrong", success: false });
    });
});
module.exports = router;
