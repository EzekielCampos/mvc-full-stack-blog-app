const router = require('express').Router();

const { error } = require('console');
const { User } = require('../../models/');
const _ = require('lodash');

router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create(req.body, { raw: true });
    req.session.save(() => {
      const userInfo = _.omit(userData, ['password']);
      req.session.user_id = userInfo.id;
      req.session.logged_in = true;
      res.status(200).json(userInfo);
    });
  } catch (error) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      const userInfo = userData.get({ plain: true });
      const credentials = _.omit(userInfo, ['password']);
      req.session.user_id = credentials.id;
      req.session.logged_in = true;
      res.json({ user: credentials, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
