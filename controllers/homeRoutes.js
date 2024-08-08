const router = require('express').Router();
const withAuth = require('../middleware/auth');

const { Post, User, Comment } = require('../models');

// The homepage will have all user posts
router.get('/', async (req, res) => {
  try {
    const userPosts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    // Convert the array of objects to just the attributes we need in raw data
    const posts = userPosts.map((post) => post.get({ plain: true }));

    // Redirect to the handlebars bage and include all the posts and the attribute
    // to know if user is logged in
    res.render('homepage', { posts, logged_in: req.session.logged_in });
  } catch (error) {
    console.error('An error occurred:', error);
  }
});

router.get('/view/post/:id', withAuth, async (req, res) => {
  try {
    // Finds the specific post by the post id and will include the the comments
    const userPosts = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    // Converts the Post object tow raw data;
    const posts = userPosts.get({ plain: true });
    // Redirect to handelbars page including the post data and login status
    res.render('posts-details', { ...posts, logged_in: req.session.logged_in });
  } catch (error) {
    console.error('An error occurred:', error);
  }
});

router.get('/login', (req, res) => {
  // If the user is logged in then they will be redirected to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  // If not user will be redirected to login handlebars
  res.render('login', { logged_in: req.session.logged_in });
});

router.get('/signup', (req, res) => {
  // If the user is logged in then they will be redirected to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  // If not user will be redirected to create new user page

  res.render('new-user', { logged_in: req.session.logged_in });
});

router.get('/create', withAuth, (req, res) => {
  // This will send the user to a page to create a new post
  res.render('new-post', { logged_in: req.session.logged_in });
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Finds all the post for the current user that is logged in
    const userPosts = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    // Convert the Post to raw data
    const list = userPosts.map((post) => post.get({ plain: true }));

    res.render('dashboard', { list, logged_in: req.session.logged_in });
  } catch (error) {
    res.status(400).json(error)
  }
});

router.get('/modify/:id', withAuth, async (req, res) => {
  try {
    // This creates a session variable with the post id number so that it can be used
    // to update post
    req.session.post_id = req.params.id;
    // After it is set then it will be redirected to the page where it will
    // be modified
    res.redirect('/modify');
  } catch (error) {
    res.json(error);
  }
});

router.get('/modify', withAuth, async (req, res) => {
  try {
    // Find that specific post using the session variable
    const specificPost = await Post.findByPk(req.session.post_id, { raw: true });
    // Redirect user to the update post page
    res.render('update-post', { ...specificPost, logged_in: req.session.logged_in });
  } catch (error) {
    res.json(error);
  }
});

router.get('/comment/:id', withAuth, async (req, res) => {
  try {
    // This creates a session variable with the post id number so that it can be used
    // to comment a certain post
    req.session.post_id = req.params.id;
    // Redirect to the page to the logic to submit a comment
    res.redirect('/submit-comment');
  } catch (error) {
    res.json(error);
  }
});

router.get('/submit-comment', withAuth, async (req, res) => {
  try {
    // Find that specific post using the session variable
    const specificPost = await Post.findByPk(req.session.post_id, { raw: true });
    // Redirects user to page where they can submit a form
    res.render('submit-comment', { ...specificPost, logged_in: req.session.logged_in });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
