const LocalStrategy = require('passport-local').Strategy;
const User = require('../../api/users/user.model');
const bcrypt = require('bcrypt');
const { isValidEmail, isValidPassword } = require('../validations');

const loginStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  },

  async (req, email, password, done) => {
    try {
      if(!isValidEmail(email) || !isValidPassword(password)) {
        const error = new Error('Email o password no cumplen con el formato esperado');
        return done(error, null);
      }

      const userDB = await User.findOne({email})
      const isValidUserPassword = await bcrypt.compare(password, userDB.password);

      if (!isValidUserPassword) {
        const error = new Error('La contraseña no coincide. Prueba de nuevo');
        error.status = 400;
        return done(error); //no hace falta poner 2do argumento porque es null (del usuario)
      }

      //para que no se mande la contraseña al logearse. peligrosito que viajen por ahi.
      const userWithoutPassword = userDB.toObject(); //convierte a objeto plano la instancia de mongoose -> .lean() tras el findOne() tmb funcionaria
      Reflect.deleteProperty(userWithoutPassword, 'password'); //delete userWhitoutPassword.password funcionaria tambien pero Reflect mas restrictivo

      return done(null, userWithoutPassword);

    }
    catch(error) {
      return done(error);
    }
  }
);

module.exports = loginStrategy