const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const tagModel = require('../models/Tag');
const protect = require("../middlewares/protectRoute");

router.post('/tag-add', protect, (req, res, next) => {
    const tag = req.body;
    tagModel.create({
        label: tag.payload
    })
        .then(dbRes => res.json(dbRes))
        .catch(dbErr => next(dbErr));
})

router.delete('/tag-delete/:id', protect, (req, res, next) => {
    tagModel.findByIdAndDelete(req.params.id, req.body)
        .then(dbRes => res.json(dbRes))
        .catch(next)
})

module.exports = router; 