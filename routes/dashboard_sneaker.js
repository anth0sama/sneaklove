const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const sneakerModel = require('../models/Sneaker')

router.post('/products_add/', checkloginStatus, (req, res, next) => {
    const {
        data
    } = req.body;
    sneakerModel.create({
            data
        })
        .then(dbRes => res.render('products_manage'))
        .catch(dbErr => next(dbErr))
})

module.exports = router; 
