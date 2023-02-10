const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema(
  {
    date: {type: Number, unique: true, required: true},
    list: [
      {
        platform: String,
        titles: [
          {
            id: Number,
            title: String,
            year: Number,
            imdb_id: String,
            titleType: String
          }
        ]
      }
    ]
  },
  {
    timestamps: true
  }
)

const Collection = mongoose.model("collections", collectionSchema);

module.exports = Collection;