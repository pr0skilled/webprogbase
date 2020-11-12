const userRepository = require('../repositories/userRepository');
const repo = new userRepository("./data/users.json");

module.exports = {
    getUsers(req, res) {
        res.send(repo.getUsers());
        res.end;
    },

    getUserById(req, res) {
        const user = repo.getUserById(req.params.id);
        console.log(user);
        if (user)
            res.status(200).send(user);
        else {
            //res.send(`No user with id ${req.params.id}`);
            res.sendStatus(404);
        }
    },
};
