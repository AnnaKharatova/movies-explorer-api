const mongoose = require('mongoose');
const validator = require('mongoose-validators');

const filmSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
  },
  director: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле должно быть заполнено'],
  },
  year: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
  },
  description: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
  },
  image: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    validate: [validator.isURL, 'Неверный адрес'],
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    validate: [validator.isURL, 'Неверный адрес'],
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    validate: [validator.isURL, 'Неверный адрес'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле должно быть заполнено'],
  },
  movieId: {
    type: Number,
    required: [true, 'Поле должно быть заполнено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
  },
});

module.exports = mongoose.model('film', filmSchema);
