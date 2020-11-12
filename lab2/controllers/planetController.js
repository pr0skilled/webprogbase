const planetRepository = require('../repositories/planetRepository');
const repo = new planetRepository("./data/planets.json");

module.exports = {
    
    getPlanets(req, res) {
        const planets = repo.getPlanets();
        const page = req.query.page;
        const per_page = req.query.per_page;
        const pages_total = Math.ceil(planets.length / per_page);
        if (page && per_page)
            if (page <= pages_total && page > 0 && per_page > 0)
                res.status(200).send(planets.slice(per_page * (page - 1), page * per_page));
            else
                res.sendStatus(400);
        else
            res.status(200).send(planets);
        res.end;
    },

    getPlanetById(req, res) {
        const planet = repo.getPlanetById(req.params.id);
        if (planet)
            res.status(200).send(planet);
        else
            res.sendStatus(404);
        res.end();
    },

    addPlanet(req, res) {
        const planet = repo.addPlanet(req.body);
        res.status(200).send(planet);
        res.end();
    },

    updatePlanet(req, res) {
        const planet = repo.updatePlanet(req.body);
        if (planet)
            res.status(200).send(planet);
        else
            res.sendStatus(404);
    },

    deletePlanet(req, res) {
        const planet = repo.deletePlanet(req.params.id);
        if (planet)
            res.status(200).send(planet);
        else
            res.sendStatus(404);
        res.end();
    },
};
