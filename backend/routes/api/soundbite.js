const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Subscription, Comment, SoundBite } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {singlePublicFileUpload, singleMulterUpload} = require('../../awsS3');

const router = express.Router();



router.post(
    '/:id',
    asyncHandler(async (req, res) => {
      const {imageUrl, title, url} = req.body;
      const soundbiteId = req.params.id;
      const soundbite = await SoundBite.findByPk(soundbiteId)
      await soundbite.update({
        imageUrl,
        title,
        url,
      });

      return res.json(soundbite)
    })
)
router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
      const soundbiteId = req.params.id;
      const soundbite = await SoundBite.findByPk(soundbiteId)
      await soundbite.destroy()
      return res.json({id: soundbiteId, userId: soundbite.userId, libraryId: soundbite.libraryId })
    })
)
router.post(
    '/:id/comments',
    asyncHandler(async(req,res)=> {
        const {userId, body} = req.body
        const soundBiteId = req.params.id
        const comment = await Comment.create({
            body,
            userId,
            soundBiteId,
        })
        return res.json(comment)
    })
)
router.get(
    '/:id/comments',
    asyncHandler(async(req,res)=> {
        const soundBiteId = req.params.id
        const comments = await Comment.findAll({
            where:{soundBiteId}
        })

        return res.json(comments)
    })
)
module.exports = router;
