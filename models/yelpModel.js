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
    }
};


module.exports = restaurantList;