const express = require('express');
const controller = require('./user.controllers');
const router = express.Router();
const isAuth = require('../../utils/auth/middlewares/authMiddlewares');

router.post('/register', controller.registerPost);
router.post('/login', controller.loginPost);
router.post('/logout', [isAuth], controller.logoutPost);
router.get("/check-session", controller.checkSessionGet);

router.put('/edit',[isAuth], controller.editUser);
router.delete('/delete', [isAuth], controller.deleteUser);
router.post('/:title', [isAuth], controller.favourites);

// router.get("/favourites", controller.getFavourites);
// router.post("/favourites/create/:id", controller.postFavourite);
// router.delete("/favourites/delete/:id", controller.deleteFavourite);

module.exports = router