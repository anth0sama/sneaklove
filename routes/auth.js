const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../models/User");

router.get("/signup", (req, res) => {
    res.render("signup");
});

router.post("/signup", (req, res, next) => {
    const user = req.body;
    if (!user.firstname || !user.lastname || !user.email || !user.password){
        return res.redirect("/auth/signup");
    };
    userModel.findOne({email: user.email})
    .then(dbRes => {
        if (dbRes) return res.redirect("/auth/signup");
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;

        userModel.create(user)
        .then(() => res.redirect("/auth/signin"))
    })
    .catch(next);
});

router.get("/signin", (req, res) => {
    res.render("signin");
});

router.post("/signin", (req, res, next) => {
    const user = req.body;
    if (!user.email || !user.password) {
        return res.redirect("/auth/signin");
    };
    userModel
    .findOne({email: user.email})
    .then(dbRes => {
    if (!dbRes) {
        return res.redirect("/auth/signin");
    }
    if (bcrypt.compareSync(user.password, dbRes.password)) {
        const { _doc: clone } = { ...dbRes };
        delete clone.password;
        req.session.currentUser = clone;
        return res.redirect("/index");
    } else {
        return res.redirect("/auth/signin");
    };
    })
    .catch(next);
});

router.get("/signout", (req, res) => {
    req.session.destroy(() => {
        res.locals.isLoggedIn = undefined;
        res.redirect("/auth/signin");
    });
});

module.exports = router;
