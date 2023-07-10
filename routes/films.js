const router = require('express').Router();
const { getFilms, createFilmCard, deleteFilmCard } = require('../controllers/films');
const { validateFilmCreation, validateFilmId } = require('../utils/validation');

router.get('/', getFilms);
router.post('/', validateFilmCreation, createFilmCard);
router.delete('/:movieId', validateFilmId, deleteFilmCard);

module.exports = router;
