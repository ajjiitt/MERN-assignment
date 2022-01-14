const mongoose = require("mongoose");
const { isEmail } = require("validator");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [isEmail],
  },
  mobile: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
