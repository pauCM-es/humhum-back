
const isAuth = (req, res, next) => {
  // console.log('middleware isAuth', req.user)

  if (!req.user) {
    const error = new Error('Necesitas estar autenticado para acceder a este lugar');
    error.status = 401;
    return next(error);
  }

  return next();
}

module.exports = isAuth