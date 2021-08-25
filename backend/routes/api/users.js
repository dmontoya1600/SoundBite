const express = require('express');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Subscription, Library, SoundBite } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
const {singlePublicFileUpload, singleMulterUpload, storage, multipleMulterUpload} = require('../../awsS3')
const multer = require('multer');
const upload = multer();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
  ];

  router.get(
    '/',
    asyncHandler(async (req, res) => {
      const users = await User.findAll()
      return res.json(users)
    })
  )
  router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
      const { email, password, username } = req.body;
      const user = await User.signup({ email, username, password });
      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    }),
  );

  router.get(
    '/:id',
    asyncHandler(async (req, res) => {
      const userId = req.params.id;
      const user = await User.findByPk(userId)
      // const pageowner = await User.findAll({
      //   where:{id: userId},
      //   include: {
      //     Subsciption,
      //     where: {
      //       userId: userId
      //     }
      //   }
      // })
      return res.json(user)
    })
  )

  router.put(
    "/:id",
    singleMulterUpload("image"),
    asyncHandler(async (req, res) => {
      const userId = req.params.id;
      const profileImageUrl = await singlePublicFileUpload(req.file);
      const user = await User.findByPk(userId)
      await user.update({
        imgUrl: profileImageUrl
      });

      return res.json(profileImageUrl)
    })
  );

  router.put(
    '/',
    validateSignup,
    asyncHandler(async(req, res) => {
      const { email, password, username, userId } = req.body;
      const user = await User.findByPk(userId)
      await user.update({
        username,
        email,
        password
      })
      await setTokenCookie(res, user);

      return res.json({
        user,
      });
    })
  )

  router.delete(
    '/:id',
    asyncHandler(async(req, res) => {
      const userId = req.params.id;
      await Subscription.destroy({
        where:{creatorUserId: userId}
      })
      await Subscription.destroy({
        where: {userId: userId}
      })
      await User.destroy({
        where: {id: userId}
      })

      res.clearCookie('token');
      return res.json({ message: 'success' });
    })
  );

  router.get(
    '/:id/libraries',
    asyncHandler(async(req, res) => {
      const userId = req.params.id;
      const libraries = await Library.findAll({
        where: {userId}
      })
      return res.json(libraries)
    })
)
router.get(
  '/:id/soundbites',
  asyncHandler(async(req, res) => {
    const userId = req.params.id;
    const soundbites = await SoundBite.findAll({
      where: {userId}
    })
    return res.json(soundbites)
  })
)

router.post(
  '/:id/libraries',
    asyncHandler(async(req, res) =>{
        const {title, imageUrl} = req.body;
        const userId = req.params.id;
        const library = await Library.create({
          title,
          imageUrl,
          userId,
        })
        res.json(library)
      }
))

router.post(
  '/:id/soundbites',
  // upload.fields([{ name: 'image ', maxCount: 1 }, { name: 'title' }]),
    singleMulterUpload('audio'),
    asyncHandler(async(req, res) =>{
        const {title, libraryId, imageUrl} = req.body;
        const userId = req.params.id;
        const url = await singlePublicFileUpload(req.file);


        const soundbite = await SoundBite.create({
          title,
          libraryId,
          userId,
          url,
          imageUrl,
        })
        res.json(soundbite)
      }
))


  module.exports = router;
