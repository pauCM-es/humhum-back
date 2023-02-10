const Title = require('./title.model');

//GET

const getTitleById = async (req, res, next) => {
  try {
    const {id} = req.params; //id de wathMode no de mongoDB
    const title = await Title.find({id_watchMode: id});
    return res.status(200).json(title);
  }
  catch(error) {
    return next(error);
  }
}

//POST
const postTitle = async (req, res, next) => {
  try {
    const data = {...req.body} 
    const titleToCreate = new Title(data);
    const created = await titleToCreate.save();

    return res.status(201).json(created);
  }
  catch(error) {
    return next(error);
  }
}


module.exports = {
  getTitleById,
  postTitle,
}