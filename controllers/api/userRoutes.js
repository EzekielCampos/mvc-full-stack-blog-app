const router = require('express').Router();
const { error } = require('console');
const { User } = require('../../models/');
const _ = require('lodash');

router.post('/signup', async (req, res) => {
  try {
    // This will create a new user from req.body and convert it to raw data
    const userData = await User.create(req.body, { raw: true });
    req.session.save(() => {
      // Omit the password when we send back a response
      const userInfo = _.omit(userData, ['password']);
      // Save the user id to know which user is currently online
      req.session.user_id = userInfo.id;
      // Updates user login status
      req.session.logged_in = true;
      res.status(200).json(userInfo);
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// This route verifies the user credentials
router.post('/login', async (req, res) => {
  try {
    // Takes the email and verifies that this account exists
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Validates the user input password with the one saved
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      // Converts to raw data
      const userInfo = userData.get({ plain: true });
      // Omits the password when sending back the response
      const credentials = _.omit(userInfo, ['password']);
      // Save the user id to know which user is currently online
      req.session.user_id = credentials.id;
      // Updates user login status
      req.session.logged_in = true;
      res.json({ user: credentials, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


router.post('/logout', (req, res) => {
  // If the user is logged in then it will delete the session and log
  // the user out
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
