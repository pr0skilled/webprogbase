const Planet = require('./../models/planet');
const JsonStorage = require('./jsonStorage');

class PlanetRepository {

    constructor(filePath) {
        this.storage = new JsonStorage(filePath);
    }

    getPlanets() {
        return this.storage.readItems();
    }

    getPlanetById(planetId) {
        const items = this.storage.readItems();
        for (const item of items) {
            if (parseInt(item.id) === parseInt(planetId)) {
                return new Planet(item.id, item.name, item.number, item.galaxy, item.temperature, item.book_release, item.photoUrl);
            }
        }
        return null;
    }

    addPlanet(planet) {
        const planets = this.getPlanets();
        planet.id = this.storage.nextId();
        planets.push(planet);
        this.storage.incrementNextId();
        this.storage.writeItems(planets);
        return planet.id;
    }

    deletePlanet(id) {
        const planets = this.getPlanets();
        const planet = this.getPlanetById(id);
        if (planet) {
            const index = planets.findIndex((plnt) => {
                return plnt.id === planet.id;
            });
            planets.splice(index, 1);
            this.storage.writeItems(planets);
            return planet;
        }
        else return undefined;
    }
    //////////
    getPagesNumber(page, per_page, name) {
        const page_size = 3;
        const maxPageSize = 3;
        if (per_page) {
            if (per_page > maxPageSize) {
                console.log("Error");
                return undefined;
            }
        }
        else per_page = page_size;

        if (!page) page = 1;

        const planets = this.getPlanets();
        const planetsNumber = Number(planets.length)
        const offset = per_page * (page - 1);

        if (planetsNumber <= offset) {
            console.log("Error");
            return undefined;
        }

        let resPlanets = [];
        let tempPlanetsLen = 0;

        if (name) {
            for (let i = 0; i < planets.length; i++) {
                if (planets[i].name.includes(name)) resPlanets.push(planets[i]);
            }
            tempPlanetsLen = resPlanets.length;
            resPlanets = resPlanets.slice(offset, offset + per_page);
        }
        const currentPlanets = planets.slice(offset, offset + per_page);
        let pagesNumber = 0;

        if ((planetsNumber / per_page) - Math.trunc(planetsNumber / per_page) != 0) 
            pagesNumber = Math.trunc(planetsNumber / per_page) + 1;
        else
            pagesNumber = Math.trunc(planetsNumber / per_page);

        if (name) {
            if ((tempPlanetsLen / per_page) - Math.trunc(tempPlanetsLen / per_page) != 0) 
                pagesNumber = Math.trunc(tempPlanetsLen / per_page) + 1;
            else 
                pagesNumber = Math.trunc(tempPlanetsLen / per_page);

            if (pagesNumber == 0) pagesNumber = 1;

            return pagesNumber;
        }

        if (pagesNumber == 0) pagesNumber = 1;
        
        return pagesNumber;
    }

    getPlanetsPaginated(page, per_page, name) {
        const page_size = 3;
        const maxPageSize = 3;
        if (per_page) {
            if (per_page > maxPageSize) {
                console.log("Error");
                return undefined;
            }
        }
        else per_page = page_size;
        if (!page) page = 1;
        const planets = this.getPlanets();
        const planetsNumber = Number(planets.length);
        const offset = per_page * (page - 1);
        if (planetsNumber <= offset) {
            console.log("Error");
            return undefined;
        }

        let resPlanets = [];

        if (name) {
            for (let i = 0; i < planets.length; i++) {
                if (planets[i].name.includes(name)) 
                    resPlanets.push(planets[i]);
            }
            resPlanets = resPlanets.slice(offset, offset + per_page);
        }
        const currentPlanets = planets.slice(offset, offset + per_page);
        if (name)
        {
            return resPlanets;
        }
        return currentPlanets;
    }
};

module.exports = PlanetRepository;

