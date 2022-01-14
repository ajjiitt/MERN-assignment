const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require("morgan");
require("dotenv").config();

require("./db.js");
// require("./models/user.js");

const port = process.env.PORT || 5000;

// middleware & register's
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(require("./routes/Login"));
app.use(require("./routes/User"));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

// listening
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
