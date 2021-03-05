const planetRepository = require('../repositories/planetRepository');
const repo = new planetRepository();

module.exports = {
    GetPlanets(req, res) {
        const pgSize = 3;

        let page;
        let name;
        if (req) {
            page = req.query.page;
            name = req.query.name;
        }

        if (!page) page = 1;
        let pages = { currentPage: Number(page) };

        if (!name) name = ``;
        pages.namePage = name;

        repo.getPlanets(
            (result) => {
                res.render('planets', { planets: result, planetDisabled: "disabled", pages: pages });
            },
            (err) => res.sendStatus(404),
            name,
            pgSize,
            pgSize * (page - 1)
        );
    },
    GetPlanetById(req, res) {
        repo.getPlanet(
            (result) => res.render('planet', { planet: result }),
            (err) => res.sendStatus(404),
            req.params.id
        );
    },
    AddPlanet(req, res) {
        repo.addPlanet(
            (result) => res.render('planet', { planet: result }),
            (err) => res.sendStatus(404),
            req.body
        );
    },
    DeletePlanetById(req, res) {
        repo.deletePlanet(
            (result) => res.redirect('/planets'),
            (err) => res.sendStatus(404),
            req.params.id
        );
    }
};