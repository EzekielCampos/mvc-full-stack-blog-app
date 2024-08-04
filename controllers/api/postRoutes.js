const router = require('express').Router();

const {Post} = require('../../models')

const withAuth = require('../../middleware/auth')

router.post('/', withAuth, async(res, req) =>{

    try {
        const postData = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
          });

          res.status(200).json(postData)


    } catch (error) {
        res.status(400).json(err);
    }

})




module.exports = router;
