const RaceRepository = require('./../repositories/raceRepository');
const repo = new RaceRepository();

module.exports = {
    GetRaces(req, res) {
        repo.getRaces(
            (result) => {
                res.send(result);
            },
            (err) => res.sendStatus(404)
        );
    },
    GetRaceById(req, res) {
        repo.getRace(
            (result) => res.send(result),
            (err) => res.sendStatus(404),
            req.params.id
        );
    },
    AddRace(req, res) {
        repo.addRace(
            (result) => {
                res.status(201);
                res.send(result);
            },
            (err) => res.sendStatus(404),
            req.body
        );
    },
    DeleteRaceById(req, res) {
        repo.deleteRace(
            (result) => res.render('index', {}),
            (err) => res.sendStatus(404),
            req.params.id
        );
    }
};