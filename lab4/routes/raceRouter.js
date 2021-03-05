const express = require('express');
const raceController = require('./../controllers/raceController');

const router = express.Router();

/**
 * returns all races
 * @route GET /races/
 * @group Races - race operations
 * @returns {Array.<Race>} Races - all races
 */
router.get('/', raceController.GetRaces)
/**
* return race by id
* @route GET /races/{id}
* @group Races - races operations
* @param {integer} id.path.required - id of the Race - eg: 1
* @returns {Race.model} 200 - Race object
* @returns {Error} 404 - Race not found
*/
    .get('/:id', raceController.GetRaceById)
/**
* add race
* @route POST /races/
* @group Races - race operations
* @param {Race.model} id.body.required - new Race object
* @returns {Race.model} 201 - added Race object
*/
    .post('/', raceController.AddRace)
/**
* delete race
* @route POST /races/{id}
* @group Races - race operations
* @param {integer} id.path.required - id of the Race - eg: 1
* @returns {Race.model} 200 - deleted Race object
* @returns {Error} 404 - Race not found
*/
    .post('/:id', raceController.DeleteRaceById);

module.exports = router;