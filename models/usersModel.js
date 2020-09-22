"use strict";

const db = require("./conn");
const bcrypt = require("bcryptjs");

class UserModel {
    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    async checkPassword(hashedPassword) {
        return bcrypt.compareSync(this.password, hashedPassword);
    }

    async save() {
        try {
            const response = await db.one(`INSERT INTO reviewer (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id;`, [this.first_name, this.last_name, this.email, this.password])
            console.log("User was created with ID:", response.id);
            return response;
        } catch (error) {
            console.error("ERROR: ", error.message);
            return error.message;
        }
    }

    async login() {
        try {
            const response = await db.one(`SELECT id, first_name, last_name, email, password FROM reviewer WHERE email = $1;`, [this.email])
            const isValid = await this.checkPassword(response.password);
            if (!!isValid) {
                const { first_name, last_name, id } = response;
                console.log(response);
                return { isValid, first_name, last_name, user_id: id };
            } else {
                return { isValid }
            }
        } catch (error) {
            console.error("ERROR:", error.message);
            return error.message;
        }
    }
};

module.exports = UserModel;