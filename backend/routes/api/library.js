const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Subscription } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

router.get(
    '/',
    asyncHandler(async(req, res) => {

    })
)

router.post(
    '/',
    asyncHandler(async(req, res) =>{
        const {userId, title} = req.body;

    })
)

module.exports = router;
