const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Subscription } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const {singlePublicFileUpload, singleMulterUpload} = require('../../awsS3')

router.get(
    '/:id',
    asyncHandler(async(req,res) => {
        const creatorId = parseInt(req.params.id);
        const subscribers = await Subscription.findAll({
            where: {creatorUserId: creatorId}
        })
        let subCount = 0
        let userArr = []
        subscribers.forEach(sub => {
            subCount++
            userArr.push(sub.userId)
        })

        res.json({
            followCount: subCount,
            userIdArray: userArr
        })
    })
)

router.post(
    '/:id',
    asyncHandler
   (async(req, res) => {
        const creatorId = parseInt(req.params.id);
        const userId = req.body.userId
        const checkSub = await Subscription.findOne({
            where:{userId: userId}
        })
        if(!checkSub){
            await Subscription.create({
                creatorUserId: creatorId,
                userId: userId
            })
        }
        return res.json({
            alreadyFollowed: checkSub ? true : false
        })
    })
)
router.delete(
    '/:id',
    asyncHandler
   (async(req, res) => {
        const creatorId = parseInt(req.params.id);
        const userId = req.body.userId
        const checkSub = await Subscription.destroy({
            where:{userId: userId}
        })
        return res.json({
            deleted: true
        })
    })
)

module.exports = router;
