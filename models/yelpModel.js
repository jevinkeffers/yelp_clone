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
    }
    
    static async getOne(slug) {
        try {
            const response = await db.one(`SELECT * FROM restaurants WHERE slug = '${slug}';`);
            return response;
        } catch (error) {
            return error.message;
        }
    };

    static async postReview(data) {
        try {
        await db.any(`INSERT INTO reviews (review_title, review, reviewer_score, reviewer_id, restaurant_id) VALUES ($1, $2, $3, $4, $5);`[data.review_title, data.review, data.score, data.reviewer_id, restaurant_id]);
        } catch (error) {
            return error.message;
        }
};
}

module.exports = restaurantList;