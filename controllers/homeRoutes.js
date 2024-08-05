const router = require('express').Router();
const withAuth = require('../middleware/auth');

const { Post, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    console.log(req.session.user_id);
    const userPosts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const posts = userPosts.map((post) => post.get({ plain: true }));
    console.log(posts);

    res.render('homepage', { posts, logged_in: req.session.logged_in });
  } catch (error) {
    console.error('An error occurred:', error);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login', { logged_in: req.session.logged_in });
});

router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('new-user', { logged_in: req.session.logged_in });
});

router.get('/create', withAuth, (req, res) => {
  res.render('new-post', { logged_in: req.session.logged_in });
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userPosts = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const list = userPosts.map((post) => post.get({ plain: true }));

    console.log(list);

    res.render('dashboard', { list, logged_in: req.session.logged_in });
  } catch (error) {}
});

router.get('/modify/:id', async (req, res) => {

  try {
    req.session.post_id = req.params.id;
   console.log(req.session.post_id)
   res.redirect('/modify');

  } catch (error) {
    res.json(error)
  }
});

router.get('/modify', async (req, res) => {

  try {
    const specificPost = await Post.findByPk(req.session.post_id, {raw:true});
   console.log(specificPost)
   console.log(req.session.post_id)
    res.render('update-post', {...specificPost, logged_in: req.session.logged_in })

  } catch (error) {
    res.json(error)
  }
});




module.exports = router;
