const User = require('../models/user');
const JsonStorage = require('./jsonStorage');

class UserRepository {

    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }

    getUsers() {
        const items = this.storage.readItems();
        const users = [];
        for (const item of items) {
            users.push(new User(item.id, item.login, item.fullname, item.role, item.registeredAt, item.avaUrl, item.isEnabled));
        }
        return users;
    }

    getUserById(userId) {
        const items = this.storage.readItems();
        for (const item of items) {
            if (parseInt(item.id) === parseInt(userId)) {
                return new User(item.id, item.login, item.fullname, item.role, item.registeredAt, item.avaUrl, item.isEnabled);
            }
        }
        return null;
    }
};

module.exports = UserRepository;
