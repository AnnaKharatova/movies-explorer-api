const router = require('express').Router();

const auth = require('../middlewares/auth');
const { validateSignUp, validateSignIn } = require('../utils/validation');
const NotFoundError = require('../utils/errors/not-found-error');
const { createUser, login } = require('../controllers/users');

router.post('/signup', validateSignUp, createUser);
router.post('/signin', validateSignIn, login);

router.use(auth);

router.use('/movies', require('./films'));
router.use('/users', require('./users'));

router.use((req, res, next) => {
  next(new NotFoundError('Извините, запрашиваемая страница не найдена'));
});

module.exports = router;
