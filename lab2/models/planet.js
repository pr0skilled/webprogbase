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