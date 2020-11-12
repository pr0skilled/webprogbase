const express = require('express');
const planetController = require('../controllers/planetController');

const router = express.Router();

router.get('/', planetController.getPlanets);

router.get('/:id', planetController.getPlanetById);

router.post('/', planetController.addPlanet);

router.put('/', planetController.updatePlanet);

router.delete('/:id', planetController.deletePlanet);

module.exports = router;