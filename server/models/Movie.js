const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    overview: { type: String, required: true },
    release_date: { type: Date },
    vote_average: { type: String }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;