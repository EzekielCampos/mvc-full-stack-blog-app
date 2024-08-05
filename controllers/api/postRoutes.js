const router = require('express').Router();

const { Post } = require('../../models');

const withAuth = require('../../middleware/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(postData);
  } catch (error) {
    console.log(error);
  }
});

router.put('/update-post', async (req, res) => {
  const updatedDate = new Date();
  try {
    const postData = await Post.update(
      {
        ...req.body,
        date_created: updatedDate,
      },
      {
        where: {
          id: req.session.post_id,
        },
      }
    );

    console.log(postData);

    res.status(200).json(postData);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/delete-post', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.session.post_id,
      },
    });

    console.log(postData);

    res.status(200).json(postData);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
