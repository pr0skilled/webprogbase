const express = require('express');
const planetController = require('../controllers/planetController');

const router = express.Router();

router.get("/new", (req, res) => { res.status(200).render('new') });
router.get('/', planetController.GetPlanets);
router.get('/:id', planetController.GetPlanetById);
router.post('/', planetController.AddPlanet);
router.post('/:id', planetController.DeletePlanetById);

module.exports = router;