const express = require("express");
const router = express.Router();
const sneakerModel = require("../models/Sneaker");


router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

router.get("/sneakers/:cat", (req, res, next) => {
  sneakerModel.find({
      category: req.params.cat
    })
    .then(dbRes => {
      res.render("products");
    })
    .catch(dbErr => next(dbErr))
});

router.get("/one-product/:id", (req, res, next) => {
  sneakerModel.findById(req.params.id)
    .then(dbRes => {
      res.render("one_product");
    })
    .catch(dbErr => next(dbErr))
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});


module.exports = router;
