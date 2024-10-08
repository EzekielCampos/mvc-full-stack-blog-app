const router = require('express').Router();
const { Comment } = require('../../models');

const withAuth = require('../../middleware/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    // Takes all the user data and the sessions variables
    // to create a comment for the specified post
    const commentData = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
      post_id: req.session.post_id,
    });

    res.status(200).json(commentData);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
