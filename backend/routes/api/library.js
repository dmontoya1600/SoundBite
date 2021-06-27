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

module.exports = router;
