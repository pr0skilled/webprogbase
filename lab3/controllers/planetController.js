const planetRepository = require('../repositories/planetRepository');
const repo = new planetRepository("./data/planets.json");
const MediaRepository = require('./../repositories/mediaRepository');
const mediaRepo = new MediaRepository('./data/media');
const path = require('path');
const fs = require('fs');
const Planet = require('../models/planet');

module.exports = {
    
    getPlanets(req, res) {
        try{
            const planets = repo.getPlanets();
            if (planets) res.status(200).render('planets', {planets: planets, planetDisabled: "disabled"});
            else res.status(404).send({planets: null, message: "Not found."});
        } catch (err) {
            console.log(err.message);
            res.status(500).send({planets: null, message: 'Server error.'});
        }
    },

    getPlanetById(req, res) {
        try {
            const planet = repo.getPlanetById(parseInt(req.params.id));
            if (planet)
            {
                res.status(200).render('planet', {planet: planet});
                //console.log(planet);
            }
            else res.status(404).send({planet: null, message: "Not found."});
        } catch (err) {
            console.log(err.message);
            res.status(500).send({planet: null, message: 'Server error.'});
        }
    },

    addPlanet(req, res) {
        console.log(req.files);
        const fileFormat = req.files['photoUrl'].mimetype.split('/')[1];
        fs.writeFileSync(path.resolve(__dirname, '../data/media/' + mediaRepo.storage.nextId() + '.' + fileFormat), req.files['photoUrl'].data, (err) => {
            if (err) {

                console.log("Can't load this photo.");

            }
        })
        const newPlanet = new Planet(0, req.body.name, Number(req.body.number), req.body.galaxy, Number(req.body.temperature), req.body.book_release, 
        '/media/' + mediaRepo.storage.nextId() + '.' + fileFormat);
        mediaRepo.storage.incrementNextId();
        const newId = repo.addPlanet(newPlanet);
        console.log(newId);
        res.redirect('/planets/' + newId);
    },

    deletePlanet(req, res) {
        repo.deletePlanet(parseInt(req.params.id));
        res.redirect('/planets');
    },

    getPlanetsPaginated(req, res) {
        try {
            const planets = repo.getPlanetsPaginated(Number(req.query.page), Number(req.query.per_page), req.query.name);
            const pagesNumber = repo.getPagesNumber(Number(req.query.page), Number(req.query.per_page), req.query.name);
            let page = req.query.page;
            let name = req.query.name;
            if (!page) page = 1;
            else page = Number(page);
            const pages = { currentPage: Number(page) };

            if (page != 1) pages.prevPage = page - 1;
            if (page != pagesNumber) pages.nextPage = page + 1; 
            if (name) pages.namePage = name;

            if (planets) 
                res.status(200).render('planets', {planets: planets, pagesNumber: pagesNumber, pages: pages, planetDisabled: "disabled"});
            else 
                res.status(404).send({planets: null, message: "Not found."});

        } catch (err) {
            console.log(err.message);
            res.status(500).send({planets: null, message: 'Server error.'});
        }
    },
};
