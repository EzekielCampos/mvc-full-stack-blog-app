const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

// This route will send to the home routes
router.use('/',homeRoutes)
// This route will send to the api routes
router.use('/api', apiRoutes);



module.exports = router;
