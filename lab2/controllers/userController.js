const userRepository = require('../repositories/userRepository');
const repo = new userRepository("./data/users.json");

module.exports = {
    getUsers(req, res) {
        const users = repo.getUsers();
        const page = req.query.page;
        const per_page = req.query.per_page;
        const pages_total = Math.ceil(users.length / per_page);
        if (page && per_page)
            if (page <= pages_total && page > 0 && per_page > 0)
                res.status(200).send(users.slice(per_page * (page - 1), page * per_page));
            else
                res.sendStatus(400);
        else
            res.status(200).send(users);
        res.end;
    },

    getUserById(req, res) {
        const user = repo.getUserById(req.params.id);
        if (user)
            res.status(200).send(user);
        else {
            res.sendStatus(404);
        }
    },
};
