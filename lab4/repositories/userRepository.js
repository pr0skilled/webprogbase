const User = require('../models/user');
const db = require('./index');

function ObjectToUser(object) {
    return new User(object.id, object.login, object.fullname, object.role,
        object.registeredAt, object.avaUrl, object.isEnabled);
};

class UserRepository {
    getUsers(result, error, limit, offset) {
        let text = `SELECT * FROM users LIMIT $1 OFFSET $2`;
        db.query(text, [limit, offset])
            .then((res) => {
                let values = [];
                res.rows.forEach(
                    value => {
                        value = ObjectToUser(value);
                        values.push(value);
                    });
                result(values);
            })
            .catch((err) => {
                console.log(err.stack);
                error(err.stack);
            });
    }

    getUser(result, error, userId) {
        let text = `SELECT * FROM users WHERE id = $1`;
        db.query(text, [userId])
            .then((res) => { result(ObjectToUser(res.rows[0])); })
            .catch((err) => {
                console.log(err.stack);
                error(err.stack);
            });
    }
};

module.exports = UserRepository;