const mongoose = require('mongoose');
const Film = require('../models/film');
const {
  BadRequestError, ForbiddenError, NotFoundError,
} = require('../utils/errors/index-errors');

module.exports.getFilms = (req, res, next) => {
  Film.find({ owner: req.user._id })
    .then((films) => {
      res.status(200).send(films);
    })
    .catch(next);
};

module.exports.createFilmCard = (req, res, next) => {
  const owner = req.user._id;
  Film.create({ owner, ...req.body })
    .then((film) => {
      res.status(201).send(film);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteFilmCard = (req, res, next) => {
  const { filmId } = req.params;
  Film.findById(filmId).orFail()
    .then((film) => {
      if (req.user._id !== film.owner.toString()) {
        return next(new ForbiddenError('Попытка удалить чужую карточку с фильмом'));
      }
      return film.deleteOne();
    })
    .then(() => res.send({ message: 'Карточка с фильмом успешно удалена' }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Фильм с указанным _id не найден.'));
      }
      return next(err);
    });
};
