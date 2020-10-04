const express = require("express"),
    router = express.Router(),
    restaurantModel = require ("../models/yelpModel");

router.get ("/:restaurant?", async function (req, res) {
    const singleRestaurantData = await restaurantModel.getOne(req.params.restaurant);
    const reviewData = await restaurantModel.getReviewsByRestaurant(req.params.restaurant)
        return res.render("template", {
            locals: {
                title: "Fake Yelp",
                singleRestaurantData: singleRestaurantData,
                reviewData: reviewData,
                is_logged_in: req.session.is_logged_in,
            },
            partials: {
                partial: "partial-business"
            },
        });
});

router.post("/:restaurant?", async (req, res) => {
    const{ review_title, review, reviewer_score, restaurant_id, restaurant_slug} = req.body;
    restaurantModel.addReview(review_title, review, reviewer_score, req.session.user_id, restaurant_id);
    res.redirect(`/business/${restaurant_slug}`);
});
    

module.exports = router;