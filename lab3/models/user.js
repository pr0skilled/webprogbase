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