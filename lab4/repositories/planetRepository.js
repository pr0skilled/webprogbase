const Planet = require('./../models/planet');
const db = require('./index');

function ObjectToPlanet(object) {
    return new Planet(object.id, object.name, object.number, object.galaxy,
        object.temperature, object.book_release, object.photoUrl, object.user_id);
}

class PlanetRepository {
    getPlanets(result, error, pattern, limit, offset) {
        let text = `SELECT * FROM planets WHERE name LIKE $1 LIMIT $2 OFFSET $3`;
        db.query(text, ['%' + pattern + '%', limit, offset])
            .then((res) => {
                let values = [];
                res.rows.forEach(
                    value => {
                        value = ObjectToPlanet(value);
                        values.push(value);
                    });
                result(values);
            })
            .catch((err) => {
                console.log(err.stack);
                error(err.stack);
            });
    }

    getPlanet(result, error, id) {
        let text = `SELECT * FROM planets WHERE id = $1`;
        db.query(text, [id])
            .then((res) => { result(ObjectToPlanet(res.rows[0])); })
            .catch((err) => {
                console.log(err.stack);
                error(err.stack);
            });
    }

    addPlanet(result, error, Item) {
        Item.user_id = 1;
        let newItem = Object.entries(Item);
        let keyValues = '';
        let values = '';
        for (let i = 0; i < newItem.length; i++) {
            keyValues += `${newItem[i][0]}`;
            values += `$${i + 1}`;
            if (i + 1 < newItem.length) {
                keyValues += `, `;
                values += `, `;
            }
        }

        let convertedNewItem = [];
        newItem.forEach(h => convertedNewItem.push(h[1]));

        let text = `INSERT INTO planets (${keyValues}) VALUES (${values}) RETURNING *`;
        db.query(text, convertedNewItem)
            .then((res) => result(ObjectToPlanet(res.rows[0])))
            .catch((err) => {
                console.log(err.stack);
                error(err.stack);
            })
    }

    deletePlanet(result, error, id) {
        let text = `DELETE FROM planets WHERE id = $1 RETURNING *`;
        db.query(text, [id])
            .then((res) => { result(id); })
            .catch((err) => {
                console.log(err.stack);
                error(err.stack);
            });
    }
};

module.exports = PlanetRepository;

