const router = require('express').Router();
const withAuth = require('../middleware/auth')

router.get('/', (req, res) => {
  try {
    res.render('homepage', { logged_in: req.session.logged_in });
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
  res.render('new-post',{ logged_in: req.session.logged_in });
});

module.exports = router;
