const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Subscription, Library } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const {singlePublicFileUpload, singleMulterUpload} = require('../../awsS3')

const router = express.Router();



router.put(
    '/:id',
    singleMulterUpload("image"),
    asyncHandler(async (req, res) => {
      const libraryId = req.params.id;
      const profileImageUrl = await singlePublicFileUpload(req.file);
      const library = await Library.findByPk(libraryId)
      await library.update({
        imgUrl: profileImageUrl
      });

      return res.json(profileImageUrl)
    })
)

module.exports = router;
