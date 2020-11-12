/**
 * @typedef Planet
 * @property {integer} id
 * @property {string} name - planet's name
 * @property {integer} number - planet's number in star system
 * @property {string} galaxy - planet's galaxy name
 * @property {integer} temperature - planet's avarage temperature
 * @property {string} book_release - release date of book, where planet first mentioned
 */

class Planet {

    constructor(id, name, number, galaxy, temperature, book_release) {
        this.id = id;  // number
        this.name = name;  // string
        this.number = number;  // number
        this.galaxy = galaxy; // string
        this.temperature = temperature; // number
        this.book_release = book_release; // date
    }
};

module.exports = Planet;