const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

/**
 * returns user by id
 * @route GET /api/users/{id}
 * @group Users - user operations
 * @param {integer} id.path.required - id of the User - eg: 1
 * @returns {User.model} 200 - User object
 * @returns {Error} 404 - User not found
 */
router.get('/:id', userController.getUserById);

/**
 * returns all users
 * @route GET /api/users
 * @group Users - user operations
 * @returns {Array.<User>} 200 - User array
 */
router.get('/', userController.getUsers);

module.exports = router;