// models/Chat.js
const { knex } = require('../config/Database');

class Chat {

    static async createUser(data) {
        return knex('chat_users').insert(data);
    }

    static async findUserById(id) {
        return knex('chat_users').where({ id }).first();
    }

}

module.exports = Chat;
