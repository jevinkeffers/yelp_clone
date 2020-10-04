"use strict";

const db = require("./conn");

class restaurantList {
    constructor (restaurant) {
        this.restaurant = restaurant;
    }

    static async getAll() {
    try {
        const response = await db.any(`SELECT * FROM restaurants ORDER BY id;`);
        return response;
    } catch (error) {
        return error.message;
    }
    };
    
    static async getOne(slug) {
        try {
            const response = await db.one(`SELECT * FROM restaurants WHERE slug = '${slug}';`);
            return response;
        } catch (error) {
            return error.message;
        }
    };

    static async addReview(review_title, review, reviewer_score, reviewer_id, restaurant_id) {
        try {
        const response = await db.result(`INSERT INTO reviews (review_title, review, reviewer_score, reviewer_id, restaurant_id) VALUES ($1, $2, $3, $4, $5);`, [review_title, review, reviewer_score, reviewer_id, restaurant_id]);
        console.log(response);
        } catch (error) {
            return error.message;
        }
    };

    static async getReviewsByRestaurant(slug) {
        try {
            const response = await db.any(`SELECT * FROM reviews INNER JOIN restaurants ON reviews.restaurant_id = restaurants.id INNER JOIN reviewer ON reviews.reviewer_id = reviewer.id WHERE restaurants.slug = '${slug}';`);
            return response;
        } catch (error) {
            return error.message;
        }
    };

};

module.exports = restaurantList;