/**
 * @typedef Race
 * @property {integer} id
 * @property {string} name - race's name
 * @property {integer} number - race's number of representatives
 * @property {integer} level - races's evolution level
 * @property {integer} planet_id - id of planet
 */


class Race {

    constructor(id, name, number, level, planet_id) {
        this.id = id;  // number
        this.name = name;  // string
        this.number = number;  // number
        this.level = level; // number
        this.planet_id = planet_id; // number
    }
};

module.exports = Race;