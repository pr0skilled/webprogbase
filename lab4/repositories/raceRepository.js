const Race = require('./../models/race');
const db = require('./index');

function ObjectToRace(object) {
    return new Race(object.id, object.name, object.number, object.level, object.planet_id);
}

class RaceRepository {
    getRaces(result, error) {
        let text = `SELECT * FROM races JOIN planets ON planets.id = races.planet_id`;
        db.query(text, [])
            .then((res) => {
                let values = [];
                res.rows.forEach(
                    value => {
                        value = ObjectToRace(value);
                        values.push(value);
                    });
                result(values);
            })
            .catch((err) => {
                console.log(err.stack);
                error(err.stack);
            });
    }

    getRace(result, error, id) {
        let text = `SELECT * FROM races WHERE id = $1`;
        db.query(text, [id])
            .then((res) => result(ObjectToRace(res.rows[0])))
            .catch((err) => {
                console.log(err.stack);
                error(err.stack);
            });
    }

    addRace(result, error, Item) {
        Item.planet_id = 2;
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

        let text = `INSERT INTO races (${keyValues}) VALUES (${values}) RETURNING *`;
        db.query(text, convertedNewItem)
            .then((res) => result(res.rows))
            .catch((err) => {
                console.log(err.stack);
                error(err.stack);
            });
    }

    deleteRace(result, error, id) {
        let text = `DELETE FROM races WHERE id = $1`;
        db.query(text, [id])
            .then((res) => { result(id); })
            .catch((err) => {
                console.log(err.stack);
                error(err.stack);
            });
    }
};

module.exports = RaceRepository;

