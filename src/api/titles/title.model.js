const mongoose = require('mongoose');

const titleSchema = new mongoose.Schema(
  {
    id_watchMode: {type:Number, required: true},
    title: String,
    original_title: String,
    plot_overview: String,
    type: String,
    runtime_minutes: Number,
    year: Number,
    end_year: Number,
    release_date: String,
    imdb_id: String,
    genres: Array,
    genre_names: Array,
    critic_score: Number,
    us_rating: String,
    poster: String,
    backdrop: String,
    networks: Array,
    network_names: Array,
    trailer: String,
    trailer_thumbnail: String,
    sources: Array
  },
  {
    timestamps: true
  }
)

const Title = mongoose.model("titles", titleSchema);

module.exports = Title;