const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/create-post', postRoutes);
router.use('/create-comment', commentRoutes);

module.exports = router;
