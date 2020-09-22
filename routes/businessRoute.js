const express = require("express"),
    router = express.Router(),
    restaurantModel = require ("../models/yelpModel");

router.get ("/:restaurant?", async function (req, res) {
    const singleRestaurantData = await restaurantModel.getOne(req.params.restaurant);
        return res.render("template", {
            locals: {
                title: "Fake Yelp",
                data: singleRestaurantData,
                is_logged_in: req.session.is_logged_in,
            },
            partials: {
                partial: "partial-business"
            },
        });
});

router.post("/:restaurant?", async (req, res) => {
    const{ title, review, reviewer_score, restaurant_id} = req.body;
    await restaurantModel.addReview(title, review, reviewer_score, restaurant_id);
    res.redirect("/");
});
    

module.exports = router;