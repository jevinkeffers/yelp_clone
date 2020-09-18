const express = require("express"),
    router = express.Router(),
    restaurantModel = require ("../models/yelpModel");

    router.get ("/:restaurant?", async function (req, res) {
        const singleRestaurantData = await restaurantModel.getOne(req.params.restaurant);
            return res.render("template", {
                locals: {
                    title: "Fake Yelp",
                    data: singleRestaurantData
                },
                partials: {
                    partial: "partial-business"
                },
            });
    });

module.exports = router;