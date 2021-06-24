const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Subscription } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const {singlePublicFileUpload, singleMulterUpload} = require('../../awsS3')

router.post(
    '/:id',
    asyncHandler
   (async(req, res) => {
        const creatorId = parseInt(req.params.id);
        const userId = req.body.userId

        await Subscription.create({
            creatorUserId: creatorId,
            userId: userId
        })
        return res.json({
            userId: userId
        })
    })
)

module.exports = router;
