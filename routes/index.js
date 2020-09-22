'use strict';
const addReview = require('../models/yelpModel')

const express = require("express"),
    router = express.Router(),
    restaurantModel = require ("../models/yelpModel");

router.get ("/", async function (req, res) {
    const restaurantData = await restaurantModel.getAll();
        return res.render("template", {
            locals: {
                title: "Fake Yelp",
                data: restaurantData,
                is_logged_in: req.session.is_logged_in,
            },
            partials: {
                partial: "partial-index"
            },
        });
})

router.post ('/', async (req, res) => {
    console.log(req.body);
    addReview.addReview(req.body);
    res.redirect('/');

})

module.exports = router;