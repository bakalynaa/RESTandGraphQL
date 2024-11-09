const Movie = require('../models/Movie');

const movieDAO = {
    getAll: () => Movie.find(),
    getById: (id) => Movie.findById(id),
    create: (movieData) => Movie.create(movieData),
    update: (id, movieData) => Movie.findByIdAndUpdate(id, movieData, { new: true }),
    delete: (id) => Movie.findByIdAndDelete(id),
};

module.exports = movieDAO;