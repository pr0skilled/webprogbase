const express = require('express');
const planetController = require('../controllers/planetController');

const router = express.Router();

router.get("/new", (req, res) => { res.status(200).render('new') });
router.get('/', planetController.getPlanetsPaginated);
router.get('/:id', planetController.getPlanetById);
router.post('/', planetController.addPlanet);
// router.put('/', planetController.updatePlanet);
router.post('/:id', planetController.deletePlanet);

module.exports = router;