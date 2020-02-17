const express = require("express"); 
const router = new express.Router(); 
const sneakerModel = require('../models/Sneaker');
const tagModel = require('../models/Tag');
const uploader = require("../config/cloudinary");
const protect = require("../middlewares/protectRoute");

router.get('/prod-add', protect, (req, res, next) => {
    tagModel.find()
        .then(tags => {
            res.render('products_add', {
                tags
            })
        })
        .catch(next);
})

router.get('/prod-manage', protect, (req, res, next) => {
    sneakerModel.find()
        .then(sneakers => {
            res.render('products_manage', {
                sneakers
            })
        })
        .catch(dbErr => next(dbErr));
})

router.post('/prod-add', protect, uploader.single("image"), (req, res, next) => {
    const sneaker = req.body;
    if (req.file) sneaker.image = req.file.secure_url;
    sneakerModel.create(sneaker)
        .then(dbRes => res.redirect('/prod-manage'))
        .catch(dbErr => next(dbErr));
})

router.get('/prod-edit/:id', protect, (req, res, next) => {
    sneakerModel.findById(req.params.id)
        .then(sneaker => res.render('product_edit', {
            sneaker
        }))
        .catch(dbErr => next(dbErr))
})

router.post('/prod-edit/:id', protect, uploader.single("image-edit"), (req, res, next) => {
    const sneaker = req.body;
    if (req.file) sneaker.image = req.file.secure_url;
    sneakerModel.findByIdAndUpdate(req.params.id, sneaker)
        .then(dbRes => res.redirect('/prod-manage'))
        .catch(dbErr => next(dbErr));
})

router.get('/prod-delete/:id', protect, (req, res, next) => {
    const sneaker = req.body;
    sneakerModel.findOneAndDelete(req.params.id, sneaker)
        .then(dbRes => res.redirect('/prod-manage'))
        .catch(dbErr => next(dbErr));
})

module.exports = router; 