const Planet = require('./../models/planet');
const JsonStorage = require('./jsonStorage');

class PlanetRepository {

    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }

    addPlanet(planet) {
        const planets = this.getPlanets();
        planet.id = this.storage.nextId();
        planets.push(planet);
        this.storage.incrementNextId();
        this.storage.writeItems(planets);
        return planet.id;
    }

    getPlanets() {
        const items = this.storage.readItems();
        const planets = [];
        for (const item of items) {
            planets.push(new Planet(item.id, item.name, item.number, item.galaxy, item.temperature, item.book_release));
        }
        return planets;
    }

    getPlanetById(planetId) {
        const items = this.storage.readItems();
        for (const item of items) {
            if (item.id === planetId) {
                return new Planet(item.id, item.name, item.number, item.galaxy, item.temperature, item.book_release);
            }
        }
        return null;
    }

    updatePlanet(updPlanet) {
        const planets = this.getPlanets();
        const planet = this.getPlanetById(updPlanet.id);
        if (planet !== null) {
            const index = planets.findIndex((plnt) => {
                return plnt.id === planet.id;
            });
            planets.splice(index, 1, updPlanet);
            this.storage.writeItems(planets);
            return true;
        }
        else return null;
    }

    deletePlanet(id) {
        const planets = this.getPlanets();
        const planet = this.getPlanetById(id);
        if (planet !== null) {
            const index = planets.findIndex((plnt) => {
                return plnt.id === planet.id;
            });
            planets.splice(index, 1);
            this.storage.writeItems(planets);
            return true;
        }
        else return null;
    }
};

module.exports = PlanetRepository;

