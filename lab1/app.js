const readlineSync = require('readline-sync');
const UserRepository = require('./repositories/userRepository');
const PlanetRepository = require('./repositories/planetRepository');
const Planet = require('./models/planet');
const parse = require('date-fns/parse');

const userRepository = new UserRepository('./data/users.json');
const planetRepository = new PlanetRepository('./data/planets.json');

while (1)
{
    const input = readlineSync.question('Enter command: ').trim().toLowerCase();
    const parts = input.split("/");
    const command = parts[0] + "/" + parts[1];
    switch (command) {
        case "get/users":
            const users = userRepository.getUsers();
            separator();
            for (const user of users) {
                console.log(`Id: ${user.id}, \nLogin:${user.login}, \nName: ${user.fullname}`);
                separator();
            }
            break;
        case "get/user":
            if (!isNaN(parts[2]) && Number.isInteger(parseFloat(parts[2]))) {
                const userId = parseInt(parts[2]);
                const user = userRepository.getUserById(userId);
                if (!user) {
                    console.log(`Error: user with id ${userId} not found.`);
                }
                else {
                    separator();
                    console.log(`Id: ${user.id}, \nLogin: ${user.login}, \nName: ${user.fullname}, \nRole: ${user.role}, \nRegistered at: ${user.registeredAt}, \nAvatar url: ${user.avaUrl}, \nIs enabled: ${user.isEnabled}`);
                    separator();
                }
            }
            else console.log(`Error: id must be an integer`);
            break;
        case "get/planets":
            const planets = planetRepository.getPlanets();
            separator();
            for (const planet of planets) {
                console.log(`Id: ${planet.id}, \nName: ${planet.name}, \nNumber: ${planet.number}`);
                separator();
            }
            break;
        case "get/planet":
            if (!isNaN(parts[2]) && Number.isInteger(parseFloat(parts[2]))) {
                const planetId = parseInt(parts[2]);
                const planet = planetRepository.getPlanetById(planetId);
                if (!planet) {
                    console.log(`Error: planet with id ${planetId} not found.`);
                }
                else {
                    separator();
                    console.log(`Id: ${planet.id}, \nName: ${planet.name}, \nNumber: ${planet.number}, \nGalaxy: ${planet.galaxy}, \nTemperature: ${planet.temperature}, \nBook release: ${planet.book_release}`);
                    separator();
                }
            }
            else console.log(`Error: id must be an integer`);
            break;
        case "delete/planet":
            if (!isNaN(parts[2]) && Number.isInteger(parseFloat(parts[2]))) {
                const planetId = parseInt(parts[2]);
                if (planetRepository.deletePlanet(planetId))
                    console.log("Deleted succesfully");
                else console.log(`Error: planet with id ${planetId} not found.`);
            }
            else console.log(`Error: id must be an integer`);
            break;
        case "update/planet":
            if (!isNaN(parts[2]) && Number.isInteger(parseFloat(parts[2]))) {
                const planetId = parseInt(parts[2]);
                const planet = planetRepository.getPlanetById(planetId);
                if (!planet) {
                    console.log(`Error: planet with id ${planetId} not found.`);
                    break;
                }
                while (1) {
                    const input = readlineSync.question("Enter 1 to change planet's name, 2 - number, 3 - galaxy, 4 - temperature, 5 - book release date, q - quit\n>");
                    if (input === "q") break;
                    switch (input) {
                        case "1":
                            const newName = readlineSync.question("Enter new planet's name: ");
                            if (newName.length !== 0)
                                planet.name = newName;
                            else {
                                console.log("Error: invalid input. Name field can't be empty");
                                break;
                            }
                            if (planetRepository.updatePlanet(planet))
                                console.log("Success");
                            else 
                                console.log("Error");
                            break;
                        case "2":
                            const newNumber = readlineSync.question("Enter new planet's number: ");
                            if (newNumber > 0)
                                planet.number = newNumber;
                            else {
                                console.log("Error: invalid input. Number field must be numeric and can't be less than zero");
                                break;
                            }
                            if (planetRepository.updatePlanet(planet))
                                console.log("Success");
                            else
                                console.log("Error");
                            break;
                        case "3":
                            const newGalaxy = readlineSync.question("Enter new planet's galaxy name: ");
                            if (newGalaxy.length !== 0)
                                planet.galaxy = newGalaxy;
                            else {
                                console.log("Error: invalid input. Galaxy field can't be empty");
                                break;
                            }
                            if (planetRepository.updatePlanet(planet))
                                console.log("Success");
                            else
                                console.log("Error");
                            break;
                        case "4":
                            const newTemp = readlineSync.question("Enter new planet's temperature (in °C): ");
                            if (!isNaN(newTemp))
                                planet.temperature = newTemp;
                            else {
                                console.log("Error: invalid input. Temperature field must be numeric");
                                break;
                            }
                            if (planetRepository.updatePlanet(planet))
                                console.log("Success");
                            else
                                console.log("Error");
                            break;
                        case "5":
                            const input = readlineSync.question("Enter new planet's book release date: ");
                            let release = parse(input, 'yyyy-MM-dd', new Date());
                            if (release)
                                planet.book_release = release.toISOString();
                            else {
                                console.log("Error: invalid input.");
                                break;
                            }
                            if (planetRepository.updatePlanet(planet))
                                console.log("Success");
                            else
                                console.log("Error");
                            break;
                        default:
                            console.log("Not supported command");
                    }
                }
            }
            else console.log(`Error: id must be an integer`);
            break;
        case "post/planet":
            const planet = new Planet();
            while (1) {
                const newName = readlineSync.question("Enter new planet's name: ");
                if (newName.length !== 0) {
                    planet.name = newName;
                    break;
                }
                else
                    console.log("Error: invalid input. Name field can't be empty");
            }
            while (1) {
                const newNumber = readlineSync.question("Enter new planet's number: ");
                if (newNumber > 0) {
                    planet.number = newNumber;
                    break;
                }
                else
                    console.log("Error: invalid input. Number field must be numeric and can't be less than zero");
            }
            while (1) {
                const newGalaxy = readlineSync.question("Enter new planet's galaxy name: ");
                if (newGalaxy.length !== 0) {
                    planet.galaxy = newGalaxy;
                    break;
                }
                else
                    console.log("Error: invalid input. Galaxy field can't be empty");
            }
            while (1) {
                const newTemp = readlineSync.question("Enter new planet's temperature: ");
                if (!isNaN(newTemp)) {
                    planet.temperature = newTemp;
                    break;
                }
                else {
                    console.log("Error: invalid input. Temperature field must be numeric");
                }
            }
            while (1) {
                const input = readlineSync.question("Enter new planet's book release date (yyyy-MM-dd): ");
                let newDate = parse(input, 'yyyy-MM-dd', new Date());
                if (newDate) {
                    planet.book_release = newDate.toISOString();
                    break;
                }
                else {
                    console.log("Error: invalid input.");
                }
            }
            let id = planetRepository.addPlanet(planet);
            console.log(`Success. New planet's id: ${id}`);
            break;
        default:
            console.log("Not supported command");
    }
}

function separator() {
    console.log("---------------------------------------------");
}