const mongoose = require("mongoose");
const { isEmail } = require("validator");
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: [isEmail],
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = new mongoose.model("Admin", adminSchema);
module.exports = Admin;
