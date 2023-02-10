const passport = require('passport');
const User = require('../../api/users/user.model');
const registerStrategy = require('./registerStrategy');
const loginStrategy = require('./loginStrategy');


/**
 * Coge la ID del usuario y actualiza la sesión.
 */
passport.serializeUser((user, done) => done(null, user._id));

/**
 * Coge la ID del usuario que ha obtenido por la cookie
 * Busca ese usuario y lo añade a req.user;
 */
passport.deserializeUser(async (id, done) => {
  try {
    const userDB = await User.findById(id);
    return done(null, userDB);
  }
  catch(error) {
    return done (error);
  }
});

const authActivate = () => {
  passport.use('registrito', registerStrategy);
  passport.use('super-login', loginStrategy);
}


module.exports = {
  authActivate
}