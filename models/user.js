const mongoose = require('mongoose');
const validator = require('mongoose-validators');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля - 2'],
    maxlength: [30, 'Максимальная длина поля - 30'],
  },
  email: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    unique: [true, 'Такой адрес уже есть'],
    validate: [validator.isEmail, 'Невалидный адрес'],
  },
  password: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    select: false,
  },

}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
