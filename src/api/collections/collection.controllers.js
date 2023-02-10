const Collection = require('./collection.model');

//GET
const getCollectionByDate = async (req, res, next) => {
  try {
    const {date} = req.params; 
    const collection = await Collection.findOne({date: date});
    return res.status(200).json(collection.list);
  }
  catch(error) {
    return next(error);
  }
}

//POST
const postCollection = async (req, res, next) => {
  try {
    const data = {...req.body} 
    const collectionToCreate = new Collection(data);
    const created = await collectionToCreate.save();
    return res.status(201).json(created);
  }
  catch(error) {
    return next(error);
  }
}

//DELETE
const deleteCollectionByDate = async (req, res, next) => {
  try {
    const { date } = req.params;
    const collection = await Collection.findOne({date: date});
    const  deleted = await Collection.findByIdAndDelete(collection.id);
    return res.status(200).json(deleted)
  }
  catch(error) {
    return next(error)
  }
}

module.exports = {
  getCollectionByDate,
  postCollection,
  deleteCollectionByDate
}