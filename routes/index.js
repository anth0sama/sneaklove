const express = require("express");
const router = express.Router();
const sneakerModel = require("../models/Sneaker");

router.get(["/", "/index"], (req, res) => {
  res.render("index");
});

router.get("/sneakers/collection", (req, res, next) => {
  sneakerModel.find()
    .populate('id_tags')
    .then(sneakers => {
      res.render("products", {
        sneakers
      });
    })
    .catch(dbErr => next(dbErr))
});

router.get("/sneakers/:cat", (req, res, next) => {
  console.log(req.params.cat)
  sneakerModel.find({
      category: req.params.cat
    })
    .populate('id_tags')
    .then(sneakers => {
      res.render("products", {
        sneakers
      });
    })
    .catch(dbErr => next(dbErr))
});

router.get("/one-product/:id", (req, res, next) => {
  sneakerModel.findById(req.params.id)
    .then(sneaker => {
      res.render("one_product", {
        sneaker
      });
    })
    .catch(dbErr => next(dbErr))
});


module.exports = router;
