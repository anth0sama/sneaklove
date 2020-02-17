const express = require("express"); 
const router = new express.Router();  
const sneakerModel = require("../models/Sneaker")
const tagModel = require("../models/Tag")

router.get("/collection", (req, res, next) => {
    sneakerModel
    .find()
    .then(sneakers => {
        res.render("products", {
            products: 
            sneakers
        });
    })
    .catch(next);
})

router.get("/men", (req, res, next) => {
    sneakerModel
        .find({ category: "men" })
        .then(sneakers => {
            res.render("products-men", {
                products: sneakers
            });
        })
        .catch(next);
})

router.get("/women", (req, res, next) => {
    sneakerModel
    .find({ category: "women" })
    .then(dbResults => {
        res.render("products-women", {
            products: dbResults
        });
    })
    .catch(next);
})

router.get("/kids", (req, res, next) => {
    sneakerModel
    .find({ category: "kids" })
    .then(dbResults => {
        res.render("products-kids", {
            products: dbResults
        });
    })
    .catch(next);
})

