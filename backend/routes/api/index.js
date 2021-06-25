const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const followRouter = require('./follow.js')
const libraryRouter = require('./library.js')

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/follow', followRouter);

router.use('/library', libraryRouter);

module.exports = router;
