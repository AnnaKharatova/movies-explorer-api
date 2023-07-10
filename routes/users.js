const router = require('express').Router();

const { getUserProfile, updateUserProfile } = require('../controllers/users');
const { validateUpdateProfile } = require('../utils/validation');

router.get('/me', getUserProfile);

router.patch('/me', validateUpdateProfile, updateUserProfile);

module.exports = router;
