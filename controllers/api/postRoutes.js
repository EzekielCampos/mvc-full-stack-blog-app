const router = require('express').Router();

const {Post} = require('../../models')

const withAuth = require('../../middleware/auth')

router.post('/', withAuth, async(req, res) =>{

    try {
      
        const postData = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
          });

          res.status(200).json(postData)
        


    } catch (error) {
       console.log(error)
    }

})


module.exports = router;
