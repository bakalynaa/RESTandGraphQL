const movieDAO = require('../dao/movieDAO');

exports.getAllMovies = async (req, res) => {
    try {
        const movies = await movieDAO.getAll();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMovieById = async (req, res) => {
    try {
        const movie = await movieDAO.getById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Запис не знайдено' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createMovie = async (req, res) => {
    try {
        const newMovie = await movieDAO.create(req.body);
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateMovie = async (req, res) => {
    try {
        const updatedMovie = await movieDAO.update(req.params.id, req.body);
        if (!updatedMovie) {
            return res.status(404).json({ message: 'Запис не знайдено' });
        }
        res.json(updatedMovie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await movieDAO.delete(req.params.id);
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Запис не знайдено' });
        }
        res.json({ message: 'Запис успішно видалено' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

