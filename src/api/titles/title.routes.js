const express = require('express');
const isAuth = require('../../utils/auth/middlewares/authMiddlewares');
const controller = require('./title.controllers');
const router = express.Router();

router.get('/:id', controller.getTitleById);
// router.post('/create', [isAuth], controller.postTitle);
router.post('/create', controller.postTitle);

module.exports = router;