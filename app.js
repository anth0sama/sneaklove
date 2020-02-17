const express = require("express");
const hbs = require("hbs");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
require("dotenv").config();
require("./config/mongodb"); // database initial setup
require("./helpers/hbs"); 

app.set("views", __dirname + "/view");
app.use(express.static("public"));
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.urlencoded({extended: false}));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(cookieParser());


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 60000
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    })
  }
));

function checkloginStatus(req, res, next) {
  res.locals.user = req.session.currentUser ? req.session.currentUser : null;
  res.locals.isLoggedIn = Boolean(req.session.currentUser);
  function eraseSessionMessage() {
    var count = 0;
    return function (req, res, next) {
      if (req.session.msg) { 
        if (count) { 
          count = 0; 
          console.log(`app started at ${process.env.SITE_URL}:${process.env.PORT}`);
        }
      }
    }
  } 
}