const userRepository = require('../repositories/userRepository');
const repo = new userRepository();

module.exports = {
    getUsers(req, res) {
        repo.getUsers(
            (result) => res.render('users', { users: result }),
            (err) => res.sendStatus(404),
            3,
            0
        );
    },
    getUserById(req, res) {
        repo.getUser(
            (result) => res.render('user', { user: result }),
            (err) => res.sendStatus(404),
            req.params.id
        );
    },
};
