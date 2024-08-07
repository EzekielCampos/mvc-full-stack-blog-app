const router = require('express').Router();

const { Post } = require('../../models');

const withAuth = require('../../middleware/auth');

// This will creata a new post
router.post('/', withAuth, async (req, res) => {
  try {
    // Takes the user input data and includes the current user id 
    // to create a post
    const postData = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(postData);
  } catch (error) {
    console.log(error);
  }
});

// The put method will update the post
router.put('/update-post', async (req, res) => {
  // Update the date that post was modified
  const updatedDate = new Date();
  try {
    // Takes the user input data and to change the post
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
    res.status(200).json(postData);
  } catch (error) {
    console.log(error);
  }
});

router.delete('/delete-post', async (req, res) => {
  try {
    // Deletes post where the specified post id was saved
    const postData = await Post.destroy({
      where: {
        id: req.session.post_id,
      },
    });
    res.status(200).json(postData);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
