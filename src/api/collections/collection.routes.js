const express = require('express');
const isAuth = require('../../utils/auth/middlewares/authMiddlewares');
const controller = require('./collection.controllers');
const router = express.Router();

router.get('/:date', controller.getCollectionByDate);
router.post('/create', controller.postCollection);
router.delete('/delete/:date', controller.deleteCollectionByDate);

module.exports = router;


