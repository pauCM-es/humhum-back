const passport = require('passport');
const User = require('./user.model')

//REGISTER
const registerPost = (req, res, next) => {
  try {
    const done = (error, user) => {
      if (error) return next(error);

      req.logIn(user, (error) => {
        if (error) return next(error);
        console.log('NEW USER REGISTERED AND LOGED IN')
        return res.status(201).json(user);
      })
    };

    passport.authenticate('registrito', done)(req)


  }
  catch(error){
    return next(error);
  }
}

//LOGIN
const loginPost = (req, res, next) => {
  try {
    const done = (error, user) => {
      if (error) return next(error);

      req.logIn(user, (error) => {
        if (error) return next(error);

        return res.status(200).json(user);
      })
    };

    passport.authenticate('super-login', done)(req);
  }
  catch (error) {
    return next(error)
  }
}

const logoutPost = async (req, res, next) => {
  try {
      const logoutUser = (error) => {
          if (error) return next(error);

          req.session.destroy(() => {
              res.clearCookie("connect.sid");
              return res.status(200).json("Te has deslogueado correctamente. Hasta pronto!");
          });
      };

      await req.logout(logoutUser);
  } catch (error) {
      return next(error);
  }
};

const checkSessionGet = (req, res, next) => {
  try {
      if(!req.user) {
          return res.status(200).json(null);
      }
      const userWithoutPass = req.user.toObject();
      Reflect.deleteProperty(userWithoutPass, 'password');
      return res.status(200).json(userWithoutPass);
  } catch (error) {
      return next(error);
  }
};


//PUT
const editUser = async (req, res, next) => {
  try {
    const fields = {...req.body};
    const options = { new: true };
    const edited = await User.findByIdAndUpdate(req.user.id, fields, options)
    return res.status(200).json(edited);
  }
  catch(error) {
    return next(error);
  }
}


//DELETE
const deleteUser = async (req, res, next) => {
  try {
    const  deleted = await User.findByIdAndDelete(req.user.id);
    return res.status(200).json(deleted)
  }
  catch(error) {
    return next(error)
  }
}

const favourites = async (req, res, next) => {
  try {

    let newFavs
    const { title } = req.params

    if (req.user.favourites.includes(title)) {
      newFavs = {favourites: req.user.favourites.filter(fav => fav !== title)}
    } 
    else {
      newFavs = {favourites: [...req.user.favourites, title]}
    }
    
    const options = { new: true };
    const edited = await User.findByIdAndUpdate(req.user.id, newFavs, options)

    const userWithoutPass = edited.toObject();
    Reflect.deleteProperty(userWithoutPass, 'password');
    return res.status(200).json(userWithoutPass);

  }
  catch (error){
    return next(error)
  }
}

module.exports = {
  registerPost,
  loginPost,
  logoutPost,
  checkSessionGet,
  editUser,
  deleteUser,
  favourites
}