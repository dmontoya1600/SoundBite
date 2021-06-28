const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Subscription, Library, SoundBite, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {singlePublicFileUpload, singleMulterUpload} = require('../../awsS3');


const router = express.Router();


router.get(
    '/',
    asyncHandler(async (req, res) => {
        const libraries = await Library.findAll();

        return res.json(libraries)
      })
)
router.post(
    '/:id',
    asyncHandler(async (req, res) => {
      const {imageUrl, title} = req.body;
      const libraryId = req.params.id;
      const library = await Library.findByPk(libraryId)
      await library.update({
        imageUrl,
        title,
      });

      return res.json(library)
    })
)
router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
      const libraryId = req.params.id;
      const library = await Library.findByPk(libraryId)
      const soundbites = await SoundBite.findAll({
          where:{libraryId}
      })
      await soundbites.forEach(soundbite => {
         Comment.destroy({
            where:{soundBiteId: soundbite.id}
        })
      })
      await SoundBite.destroy({
          where: {libraryId},
      })
      await library.destroy()
      return res.json({id: libraryId, userId: library.userId})
    })
)
module.exports = router;
