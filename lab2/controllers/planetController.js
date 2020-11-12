const planetRepository = require('../repositories/planetRepository');
const repo = new planetRepository("./data/planets.json");

module.exports = {
    
    getPlanets(req, res) {
        res.send(repo.getPlanets());
        res.end;
    },

    getPlanetById(req, res) {
        const planet = repo.getPlanetById(req.params.id);
        if (planet)
            res.send(planet);
        else
            //res.send(`No planet with id ${req.params.id}`);
            res.sendStatus(404);
        res.end();
    },

    addPlanet(req, res) {
        const planet = repo.addPlanet(req.body);
        res.send(planet);
        res.end();
    },

    updatePlanet(req, res) {
        const planet = repo.updatePlanet(req.body);
        if (planet)
            res.send(planet);
        else
            //res.send(`No planet with id ${req.params.id}`);
            res.sendStatus(404);
    },

    deletePlanet(req, res) {
        const planet = repo.deletePlanet(req.params.id);
        if (planet)
            res.send(planet);
        else
            //res.send(`No planet with id ${req.params.id}`);
            res.sendStatus(404);
        res.end();
    },
};
