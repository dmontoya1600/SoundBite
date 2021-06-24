const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const followRouter = require('./follow.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);


router.use('/follow', followRouter);


module.exports = router;
