class Planet {

    constructor(id, name, number, galaxy, temperature, book_release, photoUrl, user_id) {
        this.id = id;  // number
        this.name = name;  // string
        this.number = number;  // number
        this.galaxy = galaxy; // string
        this.temperature = temperature; // number
        this.book_release = book_release; // date
        this.photoUrl = photoUrl; // string
        this.user_id = user_id; // number
    }
};

module.exports = Planet;