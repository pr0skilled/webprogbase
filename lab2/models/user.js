/**
 * @typedef User
 * @property {integer} id
 * @property {string} login.required - unique username
 * @property {string} fullname
 * @property {integer} role - 0 - ordinary user, 1 - administrator
 * @property {string} registeredAt - date of registration (ISO 8601)
 * @property {string} avaUrl - avatar URL
 * @property {bool} isEnabled
 */

class User {

    constructor(id, login, fullname, role = 0, registeredAt = null, avaUrl = null, isEnabled = true) {
        this.id = id;  // number
        this.login = login;  // string
        this.fullname = fullname;  // string
        this.role = role; // int (0/1)
        this.registeredAt = registeredAt; // date
        this.avaUrl = avaUrl; // string
        this.isEnabled = isEnabled; // boolean
    }
};

module.exports = User;