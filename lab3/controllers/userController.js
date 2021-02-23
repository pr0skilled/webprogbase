const userRepository = require('../repositories/userRepository');
const repo = new userRepository("./data/users.json");

module.exports = {
    getUsers(req, res) {
        try {
            users = repo.getUsers();
            if (users) 
                res.status(200).render('users', {users: users, userDisabled: "disabled"});
            else 
                res.status(404).send({users: null, message: "Not found"});
        } catch (err) {
            console.log(err.message);
            res.status(500).send({user: null, message: 'Server error'});
        }
    },

    getUserById(req, res) {
        try {
            const user = repo.getUserById(parseInt(req.params.id));
            if (user) res.status(200).render('user', {user: user});
            else res.status(404).send({user: null, message: "Not found"});
        } catch(err) {
            console.log(err.message);
            res.status(500).send({user: null, message: 'Server error'});
        }
    },
};
