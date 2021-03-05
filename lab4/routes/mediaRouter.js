/*const router = require('express').Router();
const mediaController = require('./../controllers/mediaController');

*//**
* @route GET /api/media/{id}
* @group Media
* @param {integer} id.path.required ID of the media
* @returns {file} 200 - media file by ID
* @returns {Error} 404 - not found
*//*
router.get("/:id", mediaController.getMediaById);

*//**
* @route POST /api/media
* @group Media
* @comsumes multipart/form-data
* @param {file} image.formData.required - new file
* @returns {file} 201 - Media sdded
* @returns {Error} 400 - bad reguest
*//*
router.post("/", mediaController.addMedia);

module.exports = router;*/