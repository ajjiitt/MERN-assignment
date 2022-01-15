const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Admin = mongoose.model("Admin");
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // let token;
  // try{
  //   token = req.cookies.jwt;
  // }catch{
  //   res.json
  // }
  //authorization === Bearer ewefwegwrherhe
  if (!authorization) {
    return res
      .status(401)
      .json({ error: "You must be logged in", success: false, auth: "failed" });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({
        error: "You must be logged in",
        auth: "auth error",
        success: false,
      });
    }
    const { _id } = payload;
    Admin.findById(_id).then((data) => {
      req.admin = data;
      next();
    });
  });
};
