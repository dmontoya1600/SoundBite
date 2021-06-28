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
      const {body} = req.body;
      const commentId = req.params.id;
      const comment = await Comment.findByPk(commentId)
      await comment.update({
        body,
      });

      return res.json(comment)
    })
)

router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
      const commentId = req.params.id;
      const comment = await Comment.findByPk(commentId)
      await comment.destroy()

      return res.json(comment)
    })
)
module.exports = router;
