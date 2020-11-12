const express = require('express');
const planetController = require('../controllers/planetController');

const router = express.Router();

/**
 * returns all planets
 * @route GET /api/planets/
 * @group Planets - planet operations
 * @param {integer} page.query - page number
 * @param {integer} per_page.query - items per page
 * @returns {Array.<Planet>} Planets - all planets
 */
router.get('/', planetController.getPlanets);

/**
* return planet by id
* @route GET /api/planets/{id}
* @group Planets - planet operations
* @param {integer} id.path.required - id of the Planet - eg: 1
* @returns {Planet.model} 200 - Planet object
* @returns {Error} 404 - Planet not found
*/
router.get('/:id', planetController.getPlanetById);

/**
* add planet
* @route POST /api/planets/
* @group Planets - planet operations
* @param {Planet.model} id.body.required - new Planet object
* @returns {Planet.model} 201 - added Planet object
*/
router.post('/', planetController.addPlanet);

/**
* update planet
* @route PUT /api/planets/
* @group Planets - planet operations
* @param {Planet.model} id.body.required - new Planet object
* @returns {Planet.model} 200 - changed Planet object
*/
router.put('/', planetController.updatePlanet);

/**
* delete planet
* @route DELETE /api/planets/{id}
* @group Planets - planet operations
* @param {integer} id.path.required - id of the Planet - eg: 1
* @returns {Planet.model} 200 - deleted Planet object
* @returns {Error} 404 - Planet not found
*/
router.delete('/:id', planetController.deletePlanet);

module.exports = router;