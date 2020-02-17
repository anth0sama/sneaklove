const express = require("express");
const router = new express.Router();
module.exports = router;

router.post("/signup", (req, res, next) => {
    const user = req.body;
    if (!user.firstname || !user.lastname || !user.email || !user.password){
        return res.redirect("/auth/signup");
    };
    userModel.findOne({email: user.email})
    .then(dbRes => {
        router.post("/signup", (req, res, next) => {
            user.password = hash;
            userModel.create(user)
            .then(() => res.redirect("/auth/signin"))
        })
    .catch(next);
});

router.post("/signup", (req, res, next) => {
    router.get("/signin", (req, res) => {
    res.render("auth/signin");
});

router.post("/signin", (req, res, next) => {
    const user = req.body;
    if (!user.email || !user.password) {
        return res.redirect("/signin");
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
            return res.redirect("/dashboard");
        } else {
            return res.redirect("/auth/signin");
        };
    })
    .catch(next)
})})});

