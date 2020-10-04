"use strict";

const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

const UserModel = require("../models/usersModel");

router.get("/", (req, res) => {
    res.redirect("/users/login");
});

router.get("/login", (req, res) => {
    res.render("template", {
        locals: {
            title: "Login Page", 
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: "partial-login-form",
        },
    });
});

router.get("/signup", (req, res) => {
    res.render("template", {
        locals: {
            title: "Sign Up Page",
            is_logged_in: req.session.is_logged_in
        },
        partials: {
            partial: "partial-signup-form",
        },
    });
});

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
})

router.post("/signup", (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    // Salt AND Hash our password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)
    const userInstance = new UserModel(null, first_name, last_name, email, hash);
    userInstance.save().then(response => {
        if(response.id !== undefined) {
            res.redirect('/users/login');
        } else {
            res.redirect('/users/signup');
        }
    })
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const userInstance = new UserModel(null, null, null, email, password);
    userInstance.login().then(response => {
        req.session.is_logged_in = response.isValid;
        if (!!response.isValid) {
            const { user_id, first_name, last_name } = response;
            req.session.first_name = first_name;
            req.session.last_name = last_name;
            req.session.user_id = user_id;
            res.redirect("/");
        } else {
            res.redirect('/users/signup');
        }
    })
});

module.exports = router;